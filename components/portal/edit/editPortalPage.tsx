"use client";
import React, { FC, useState, useCallback } from 'react';
import {
    DndContext,
    closestCenter,
    MouseSensor,
    TouchSensor,
    DragOverlay,
    useSensor,
    useSensors,
    DragStartEvent,
    DragEndEvent,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import Grid from './Grid';
import SortableItem from './SortableItem';
import Item from './Item';

export const EditPortalPage: FC = () => {
    const [items, setItems] = useState(Array.from({ length: 14 }, (_, i) => (i + 1).toString()));
    const [activeId, setActiveId] = useState<string | null>(null);
    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

    const handleDragStart = useCallback((event: DragStartEvent) => {
        setActiveId(event.active.id as any);
    }, []);
    const handleDragEnd = useCallback((event: DragEndEvent) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            setItems((items) => {
                const oldIndex = items.indexOf(active.id as any);
                const newIndex = items.indexOf(over!.id as any);

                return arrayMove(items, oldIndex, newIndex);
            });
        }

        setActiveId(null);
    }, []);
    const handleDragCancel = useCallback(() => {
        setActiveId(null);
    }, []);

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragCancel={handleDragCancel}
        >
            <SortableContext items={items} strategy={rectSortingStrategy}>
                <Grid columns={7}>
                    {items.map((id) => (
                        <SortableItem key={id} id={id} />
                    ))}
                </Grid>
            </SortableContext>
            <DragOverlay adjustScale style={{ transformOrigin: '0 0 ' }}>
                {activeId ? <Item id={activeId} isDragging /> : null}
            </DragOverlay>
        </DndContext>
    );
};


