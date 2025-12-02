import { memo, useState } from 'react'
import { DragDropContext, Droppable, Draggable, type DropResult } from 'react-beautiful-dnd';
import type { MatchQuestion, ResultQuestionType } from '../../types';
import Definitions from '../card/Definitions';
import { motion } from 'framer-motion';

type MatchQuestinComponentProps = {
    match_question: MatchQuestion[],
    handleScoreMatch: (idTerm: number, idDefinition: number, isCount: boolean, idUpdate: boolean, isRemove: boolean, isChangeEmpty: boolean) => void,
    reductCount: () => void,
    faulties: ResultQuestionType[],
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

function MatchQuestinComponent({ match_question, handleScoreMatch, reductCount, faulties }: MatchQuestinComponentProps) {
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

    const getMarrin = () => {
        if (isDragging)
            return "mb-50"
        if (match_question.length == 4)
            return "mb-25"
        if (match_question.length == 5)
            return "mb-50"
        return 'm-3.5'
    }


    const findValue = (idTerm: number) => {
        return faulties.findIndex(item => (item.choice === idTerm && !item.isCorrect))
    }

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

        // hoan doi vi tri
        if (droppableIdDestination === droppableIdSource && droppableIdDestination === "drop") {
            const indexDestination = destination.index
            const indexSource = source.index
            // check definition
            if (matchs[indexDestination].definition !== "" && matchs[indexSource].definition !== "") {
                handleScoreMatch(match_question[indexDestination].id, +matchs[indexSource].id, false, true, false, false)
                handleScoreMatch(match_question[indexSource].id, +matchs[indexDestination].id, false, true, false, false)
                setMatchs(pre => {
                    const newMatchs: Match[] = [...pre];
                    [newMatchs[indexSource], newMatchs[indexDestination]] = [newMatchs[indexDestination], newMatchs[indexSource]];
                    return newMatchs;
                })
            } else if (matchs[indexDestination].definition === "") { // khi hoan doi vs 1 th chua co difinition
                handleScoreMatch(match_question[indexDestination].id, +matchs[indexSource].id, false, true, false, true)
                setMatchs(pre => {
                    const term = [...pre]
                    term[indexDestination] = term[indexSource]
                    term[indexSource] = defaultMatch
                    return term;
                })
            }

        }

        if (droppableIdDestination === droppableIdSource) return

        // truong hop chon
        if (droppableIdSource === "definications") {
            const indexDestination = destination.index
            const indexSource = source.index
            const definitionIndex = definitions[indexSource].definition
            const idTerm = +definitions[indexSource].id
            handleScoreMatch(match_question[indexDestination].id, +definitions[indexSource].id, true, false, false, false)
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
        } else { // truong bo chon
            if (matchs[source.index].definition === "" && matchs[destination.index].definition === "") return
            const indexSourceDrag = source.index
            const { indexSource, definition } = matchs[indexSourceDrag]
            handleScoreMatch(match_question[destination.index].id, matchs[source.index].id, false, false, true, false)
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
            <motion.div
                className={`grid grid-cols-2 w-[800px] h-[400px] ${getMarrin()} `}
                layout
            >
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

                <div className=''>
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
                                                                        ? <div className={(findValue(matchs[index].id) > -1) ? 'p-2.5 text-red-500' : 'p-2.5'}>
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
            </motion.div>
        </DragDropContext>
    )
}

export default memo(MatchQuestinComponent)