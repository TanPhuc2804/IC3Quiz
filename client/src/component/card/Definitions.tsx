import React from 'react'
import { Draggable } from 'react-beautiful-dnd';

type DefinitionType={
    id:string,
    definition:string,
    index:string
}

type DefinitionsProps = {
    definitions: DefinitionType[],
    children?: React.ReactNode
}
const Definitions = React.forwardRef<HTMLDivElement, DefinitionsProps>(({ definitions, children }, ref) => {
    return (
        <div ref={ref}>
            {definitions.map((item, index) => (
                <Draggable draggableId={item.id} index={+index} key={`definition-${index}`}>
                    {
                        (provided) => (
                            <div
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                                className={item.definition !==""?'bg-blue-800 text-white h-[100px] p-2.5 m-1.5 rounded-2xl':""}
                                key={index}
                            >
                                {item.definition}</div>

                        )
                    }
                </Draggable>
            ))}
            {children}
        </div>
    );
});


export default Definitions