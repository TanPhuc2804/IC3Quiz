import React, { memo, useState } from 'react'
import { DragDropContext, Droppable, Draggable, type DropResult, type DragStart, type ResponderProvided } from 'react-beautiful-dnd';
import type { MatchQuestion } from '../../types';
import Definitions from '../card/Definitions';

type MatchQuestinComponentProps = {
    match_question: MatchQuestion[],
    handleScoreMatch: (idTerm: number, idDefinition: number,isCount:boolean,idUpdate:boolean) => void,
    reductCount:()=>void,

}
type Match = {
    indexSource: number,
    definition: string,
    id: number
}

const defaultMatch: Match = {
    indexSource: 0,
    definition: "",
    id: 0
}

function shuffleArray<T>(array: T[]): T[] {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function MatchQuestinComponent({ match_question, handleScoreMatch,reductCount }: MatchQuestinComponentProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [definitions, setDefinitions] = useState(
        shuffleArray(
            match_question.map((item, index) => ({
                id: item.id.toString(),
                index: index.toString(),
                definition: item.definition
            }))
        )
    );
    const [matchs, setMatchs] = useState<Match[]>(Array.from({ length: definitions.length }, () => ({ ...defaultMatch })))



    const handleDragStart = () => setIsDragging(true);
    const handleDragEnd = (result: DropResult) => {
        setIsDragging(false);
        const { source, destination } = result
        if (!destination) return
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return
        }
        const droppableIdDestination = destination.droppableId
        const droppableIdSource = source.droppableId

        if (droppableIdDestination === droppableIdSource && droppableIdDestination === "drop") {
            const indexDestination = destination.index
            const indexSource = source.index
            handleScoreMatch(match_question[indexDestination].id, +matchs[indexSource].id,false,true)
            handleScoreMatch(match_question[indexSource].id, +matchs[indexDestination].id,false,true)
            // console.log(matchs)
            // check definition
            if (matchs[indexDestination].definition !== "" && matchs[indexSource].definition !== "") {

                setMatchs(pre => {
                    const newMatchs: Match[] = [...pre];
                    [newMatchs[indexSource], newMatchs[indexDestination]] = [newMatchs[indexDestination], newMatchs[indexSource]];
                    return newMatchs;
                })
            }

        }

        if (droppableIdDestination === droppableIdSource) return

        if (droppableIdSource === "definications") {
            const indexDestination = destination.index
            const indexSource = source.index
            const definitionIndex = definitions[indexSource].definition
            const idTerm = +definitions[indexSource].id
            handleScoreMatch(match_question[indexDestination].id, +definitions[indexSource].id,true,false)
            // if matchs[indexDestination].difinition !== "" => doi cho 
            if (matchs[indexDestination].definition !== "") {
                const definitionMatch = matchs[indexDestination].definition
                setDefinitions(pre => {
                    let newDefinitions = [...pre]
                    newDefinitions[matchs[indexDestination].indexSource].definition = definitionMatch
                    newDefinitions[indexSource].definition = ""
                    return newDefinitions
                })
                setMatchs(pre => {
                    const newMatchs = pre.map((item, idx) => {
                        if (idx === indexDestination) {
                            return { ...item, definition: definitionIndex, indexSource: indexSource, id: idTerm };
                        }
                        return { ...item };
                    });
                    return newMatchs;
                })
            } else {
                setDefinitions(pre => {
                    let newDefinitions = [...pre]
                    newDefinitions[indexSource].definition = ""
                    return newDefinitions
                })
                setMatchs(pre => {
                    const newMatchs = pre.map((item, idx) => {
                        if (idx === indexDestination) {
                            return { ...item, definition: definitionIndex, indexSource: indexSource, id: idTerm };
                        }
                        return { ...item };
                    });
                    return newMatchs;
                })
            }
        } else {
            if (matchs[source.index].definition === "" && matchs[destination.index].definition === "") return
            const indexSourceDrag = source.index
            const { indexSource, definition } = matchs[indexSourceDrag]
            reductCount()
            setDefinitions(pre => {
                const newDefinitions = [...pre]
                newDefinitions[indexSource].definition = definition
                return newDefinitions
            })

            setMatchs(pre => {
                const newMatchs = [...pre]
                newMatchs[indexSourceDrag].definition = ""
                return newMatchs
            })

        }

    }

    return (
        <DragDropContext
            onDragEnd={handleDragEnd}
            onDragStart={handleDragStart}
        >
            <div className='grid grid-cols-2 w-[800px] h-[400px]'>
                <div>
                    <p className=' p-3 text-center font-bold bg-gray-200 rounded--2xl'>Thuật ngữ ( Kéo thả)</p>
                    <Droppable
                        droppableId={"definications"}
                        key={"definications"}
                        isDropDisabled={false}
                    >
                        {
                            (provided) => (
                                <div>

                                    <Definitions
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        definitions={definitions}
                                    >
                                    </Definitions>
                                    {provided.placeholder}
                                </div>
                            )
                        }
                    </Droppable>
                </div>

                <div>
                    <p className=' p-3 text-center font-bold bg-gray-200 rounded-r-2xl'>Định nghĩa</p>
                    <Droppable droppableId='drop' key={"drop"}>
                        {
                            (provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    key={"div-drop"}
                                    className="relative"
                                >
                                    {
                                        match_question.map((question, index) => (
                                            <div className='h-[100px] m-1.5' key={`map-${index}`}>
                                                <div key={index} className='relative bg-blue-800 text-white p-1.5 rounded-[6px] mb-[5px]'>{question.term}</div>
                                                <Draggable
                                                    draggableId={`drop-${index}`}
                                                    index={index}
                                                    key={`drop-${index}`}
                                                >
                                                    {
                                                        (provided) => (

                                                            <div
                                                                {...provided.dragHandleProps}
                                                                {...provided.draggableProps}
                                                                ref={provided.innerRef}
                                                                className='w-full min-h-[60px] border-2 border-dashed rounded flex  items-center justify-center text-gray-500 text-sm'
                                                            >
                                                                {
                                                                    matchs[index].definition !== ""
                                                                        ? <div className='p-2.5'>
                                                                            {matchs[index].definition}
                                                                        </div>
                                                                        : <span>Kéo định nghĩa vào đây</span>
                                                                }
                                                            </div>
                                                        )
                                                    }
                                                </Draggable>
                                            </div>
                                        ))
                                    }
                                    {provided.placeholder}
                                    {isDragging && (
                                        <div className="absolute left-0 right-0 bottom-0 h-[100px] bg-white z-10 rounded-b pointer-events-none" />
                                    )}
                                </div>
                            )
                        }

                    </Droppable>

                </div>
            </div>
        </DragDropContext>
    )
}

export default memo(MatchQuestinComponent)