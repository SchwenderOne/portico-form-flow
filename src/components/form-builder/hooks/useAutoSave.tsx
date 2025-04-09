
import { useEffect, useRef } from 'react';
import { FormElement } from '@/types/form';
import { useFormMetadata } from '@/context/FormMetadataContext';
import { createFormVersion } from '@/services/forms-service';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

// Enums for auto-save events
export enum AutoSaveEvent {
  PUBLISH = 'publish',
  LAYOUT_CHANGE = 'layout_change',
  FIELD_ADDITION = 'field_addition',
  FIELD_DELETION = 'field_deletion',
  GROUP_OPERATION = 'group_operation',
}

interface UseAutoSaveOptions {
  elements: FormElement[];
  isEnabled?: boolean;
  saveDelay?: number;
}

export const useAutoSave = ({
  elements,
  isEnabled = true,
  saveDelay = 2000, // Delay to batch changes
}: UseAutoSaveOptions) => {
  const { metadata } = useFormMetadata();
  const { user } = useAuth();
  const previousElementsRef = useRef<FormElement[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const operationsQueueRef = useRef<Set<AutoSaveEvent>>(new Set());

  // Helper to detect significant changes
  const hasMajorChanges = (prevElements: FormElement[], newElements: FormElement[]): boolean => {
    // Check for additions or deletions
    if (prevElements.length !== newElements.length) {
      return true;
    }

    // Check for significant position or property changes
    // This is a simplified check - you might want to make it more sophisticated
    for (const newElement of newElements) {
      const prevElement = prevElements.find(e => e.id === newElement.id);
      if (!prevElement) {
        return true; // New element added
      }

      // Check for position change beyond threshold
      const positionChanged = 
        Math.abs(prevElement.position.x - newElement.position.x) > 50 ||
        Math.abs(prevElement.position.y - newElement.position.y) > 50;

      // Check for major property changes
      const hasPropertyChanges = 
        prevElement.type !== newElement.type ||
        prevElement.required !== newElement.required ||
        prevElement.groupId !== newElement.groupId;

      if (positionChanged || hasPropertyChanges) {
        return true;
      }
    }

    return false;
  };

  // Debounced auto-save function
  const triggerAutoSave = async (events: AutoSaveEvent[]) => {
    if (!isEnabled || !metadata.id || !user) return;

    try {
      // Determine an appropriate label based on the events
      let label = 'Auto-saved version';
      
      if (events.includes(AutoSaveEvent.PUBLISH)) {
        label = 'Published version';
      } else if (events.includes(AutoSaveEvent.FIELD_ADDITION)) {
        label = 'Added new field(s)';
      } else if (events.includes(AutoSaveEvent.FIELD_DELETION)) {
        label = 'Removed field(s)';
      } else if (events.includes(AutoSaveEvent.GROUP_OPERATION)) {
        label = 'Updated field grouping';
      } else if (events.includes(AutoSaveEvent.LAYOUT_CHANGE)) {
        label = 'Updated layout';
      }

      // Create snapshot of current form state
      const snapshot = {
        elements,
        metadata: {
          title: metadata.name,
          description: metadata.description,
          status: metadata.status,
        }
      };
      
      // Save version to database
      await createFormVersion(metadata.id, label, snapshot);
      console.log('Auto-saved form version:', label);
    } catch (error) {
      console.error("Auto-save failed:", error);
      // Silent fail - don't show errors for auto-save
    }
  };

  // Queue an event for auto-save
  const queueAutoSaveEvent = (event: AutoSaveEvent) => {
    if (!isEnabled) return;

    operationsQueueRef.current.add(event);
    
    // Cancel existing timer to debounce
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    
    // Set a new timer
    timerRef.current = setTimeout(() => {
      const events = Array.from(operationsQueueRef.current);
      triggerAutoSave(events);
      operationsQueueRef.current.clear();
      timerRef.current = null;
    }, saveDelay);
  };

  // Watch for major element changes
  useEffect(() => {
    if (!isEnabled || elements.length === 0) return;

    const prevElements = previousElementsRef.current;
    
    // Check if this is the first render or if there are major changes
    if (prevElements.length === 0 || hasMajorChanges(prevElements, elements)) {
      // Determine what kind of change occurred
      if (prevElements.length < elements.length) {
        queueAutoSaveEvent(AutoSaveEvent.FIELD_ADDITION);
      } else if (prevElements.length > elements.length) {
        queueAutoSaveEvent(AutoSaveEvent.FIELD_DELETION);
      } else {
        // Same number of elements but positions/properties changed
        queueAutoSaveEvent(AutoSaveEvent.LAYOUT_CHANGE);
      }
    }

    // Update reference
    previousElementsRef.current = [...elements];

    // Cleanup timer
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [elements, isEnabled]);

  return {
    queueAutoSaveEvent
  };
};
