import { Box, Button, Input, InputGroup, InputLeftElement, InputRightElement, Select, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text } from "@chakra-ui/react"
import { useState } from "react"
import { toFarsiNumber } from "../../utils/utils"

interface FilterComponentProps {
    setIsFilterOpen: (isOpen: boolean) => void
}

interface Filters {
    evaluatorName: string,
    sesssionId: string,
    customerNumber: string,
    agentName: string,
    callReason: string,
    callType: string,
    satisfactionScore: number,
    callStartScore: number,
    callEndScore: number,
    holdScore: number,
    agentTalk: number,
    customerTalk: number,
    conflict: number,
    conflictInSec: number,
    conflictByAgent: number,
    silence: number,
    callFrom: number | undefined,
    callTo: number | undefined
}

const FilterComponent: React.FC<FilterComponentProps> = ({setIsFilterOpen}) => {

    const [filters, setFilters] = useState<Filters>({
        evaluatorName: '',
        sesssionId: '',
        customerNumber: '',
        agentName: '',
        callReason: '',
        callType: '',
        satisfactionScore: 0,
        callStartScore: 0,
        callEndScore: 0,
        holdScore: 0,
        agentTalk: 0,
        customerTalk: 0,
        conflict: 0,
        conflictInSec: 0,
        conflictByAgent: 0,
        silence: 0,
        callFrom: undefined,
        callTo: undefined
    })

    return (
        <div className="Filters">
            <div className="FiltersComponent">
                <div className="title">ویژگی های متنی</div>
                <Box className="body" dir="rtl">
                    <Input
                        size={'lg'}
                        className="filterInput"
                        placeholder='نام کارشناس'
                        onChange={(e) => setFilters({ ...filters, agentName: e.target.value })}
                        value={filters.agentName}
                        focusBorderColor="#BD5EC2"
                        borderColor={'#E4E4E4'}
                    />
                    <Input
                        size={'lg'}
                        className="filterInput"
                        placeholder='نام پایشگر'
                        onChange={(e) => setFilters({ ...filters, evaluatorName: e.target.value })}
                        value={filters.evaluatorName}
                        focusBorderColor="#BD5EC2"
                        borderColor={'#E4E4E4'}
                    />
                    <Input
                        size={'lg'}
                        className="filterInput"
                        placeholder='شماره مشتری'
                        onChange={(e) => setFilters({ ...filters, customerNumber: e.target.value })}
                        value={filters.customerNumber}
                        focusBorderColor="#BD5EC2"
                        borderColor={'#E4E4E4'}
                    />
                    <Input
                        size={'lg'}
                        className="filterInput"
                        placeholder='شناسه جلسه'
                        onChange={(e) => setFilters({ ...filters, sesssionId: e.target.value })}
                        value={filters.sesssionId}
                        focusBorderColor="#BD5EC2"
                        borderColor={'#E4E4E4'}
                    />
                    <Input
                        size={'lg'}
                        className="filterInput"
                        placeholder='علت تماس'
                        onChange={(e) => setFilters({ ...filters, callReason: e.target.value })}
                        value={filters.callReason}
                        focusBorderColor="#BD5EC2"
                        borderColor={'#E4E4E4'}
                    />
                    <Select
                        iconColor={'#C8C8C8'}
                        iconSize="30"
                        _open={{ background: 'red' }}
                        size={'lg'}
                        className="filterSelect"
                        placeholder='نوع تماس'
                        dir="rtl"
                        focusBorderColor="#BD5EC2"
                        defaultValue={'option3'}
                        borderColor={'#E4E4E4'}
                    >
                        <option value='option1'>ورودی</option>
                        <option value='option2'>خروجی</option>
                        <option value='option3'>هر دو</option>
                    </Select>
                </Box>
            </div>

            {/* call sound filter */}
            <div className="FiltersComponent">
                <div className="title">ویژگی های صوتی</div>
                <Box className="body">
                    <Box className="SliderWrapper">
                        <Text className="SliderLabel"> درصد امتیاز رضایت : {toFarsiNumber(filters.satisfactionScore)}</Text>
                        <div className="SliderRange">
                            <span>{toFarsiNumber(100)}%</span>
                            <span>{toFarsiNumber(0)}%</span>
                        </div>
                        <Slider
                            defaultValue={filters.satisfactionScore}
                            min={0}
                            max={100}
                            step={1}
                            onChange={(val) => setFilters({ ...filters, satisfactionScore: val })}
                        >
                            <SliderTrack bg="#D9D9D9" height="15px" borderRadius={10}>
                                <SliderFilledTrack bg="#BD5EC2" />
                            </SliderTrack>
                            <SliderThumb boxSize={6} bg="#5E5E5E" style={{ transform: 'Translate(-7px, -12px)' }} />
                        </Slider>
                    </Box>
                    <Box className="SliderWrapper">
                        <Text className="SliderLabel"> درصد امتیاز شروع تماس : {toFarsiNumber(filters.callStartScore)}</Text>
                        <div className="SliderRange">
                            <span>{toFarsiNumber(100)}%</span>
                            <span>{toFarsiNumber(0)}%</span>
                        </div>
                        <Slider
                            defaultValue={filters.callStartScore}
                            min={0}
                            max={100}
                            step={1}
                            onChange={(val) => setFilters({ ...filters, callStartScore: val })}
                        >
                            <SliderTrack bg="#D9D9D9" height="15px" borderRadius={10}>
                                <SliderFilledTrack bg="#BD5EC2" />
                            </SliderTrack>
                            <SliderThumb boxSize={6} bg="#5E5E5E" style={{ transform: 'Translate(-7px, -12px)' }} />
                        </Slider>
                    </Box>
                    <Box className="SliderWrapper">
                        <Text className="SliderLabel"> درصد امتیاز پایان تماس : {toFarsiNumber(filters.callEndScore)}</Text>
                        <div className="SliderRange">
                            <span>{toFarsiNumber(100)}%</span>
                            <span>{toFarsiNumber(0)}%</span>
                        </div>
                        <Slider
                            defaultValue={filters.callEndScore}
                            min={0}
                            max={100}
                            step={1}
                            onChange={(val) => setFilters({ ...filters, callEndScore: val })}
                        >
                            <SliderTrack bg="#D9D9D9" height="15px" borderRadius={10}>
                                <SliderFilledTrack bg="#BD5EC2" />
                            </SliderTrack>
                            <SliderThumb boxSize={6} bg="#5E5E5E" style={{ transform: 'Translate(-7px, -12px)' }} />
                        </Slider>
                    </Box>
                    <Box className="SliderWrapper">
                        <Text className="SliderLabel"> درصد امتیاز هولد: {toFarsiNumber(filters.holdScore)}</Text>
                        <div className="SliderRange">
                            <span>{toFarsiNumber(100)}%</span>
                            <span>{toFarsiNumber(0)}%</span>
                        </div>
                        <Slider
                            defaultValue={filters.holdScore}
                            min={0}
                            max={100}
                            step={1}
                            onChange={(val) => setFilters({ ...filters, holdScore: val })}
                        >
                            <SliderTrack bg="#D9D9D9" height="15px" borderRadius={10}>
                                <SliderFilledTrack bg="#BD5EC2" />
                            </SliderTrack>
                            <SliderThumb boxSize={6} bg="#5E5E5E" style={{ transform: 'Translate(-7px, -12px)' }} />
                        </Slider>
                    </Box>
                </Box>
            </div>

            {/* call filters */}
            <div className="FiltersComponent">
                <div className="title">ویژگی های تماس</div>
                <Box className="body">
                    <InputGroup width={'45%'} className="FiltersInputGroup">
                        <InputLeftElement pointerEvents="none" bg={'#D9D9D9'} borderTopRightRadius={'5px'} borderBottomRightRadius={'5px'}>
                            <Text fontSize={'18px'} fontFamily={'Shabnam'}>از</Text>
                        </InputLeftElement>
                        <Input type="number" placeholder="" value={filters.callFrom} onChange={(e) => setFilters({ ...filters, callFrom: +(e.target.value) })} />
                        <InputRightElement bg={'#D9D9D9'} width={'25%'} borderTopLeftRadius={'5px'} borderBottomLeftRadius={'5px'}>
                            <Text fontSize={'18px'} fontFamily={'Shabnam'}>دقیقه</Text>
                        </InputRightElement>
                    </InputGroup>
                    <InputGroup width={'45%'} className="FiltersInputGroup">
                        <InputLeftElement pointerEvents="none" bg={'#D9D9D9'} borderTopRightRadius={'5px'} borderBottomRightRadius={'5px'}>
                            <Text fontSize={'18px'} fontFamily={'Shabnam'}>تا</Text>
                        </InputLeftElement>
                        <Input type="number" placeholder="" value={filters.callTo} onChange={(e) => setFilters({ ...filters, callTo: +(e.target.value) })} />
                        <InputRightElement bg={'#D9D9D9'} width={'25%'} borderTopLeftRadius={'5px'} borderBottomLeftRadius={'5px'}>
                            <Text fontSize={'18px'} fontFamily={'Shabnam'}>دقیقه</Text>
                        </InputRightElement>
                    </InputGroup>
                    <Box className="SliderWrapper">
                        <Text className="SliderLabel"> درصد صحبت کارشناس : {toFarsiNumber(filters.agentTalk)}</Text>
                        <div className="SliderRange">
                            <span>{toFarsiNumber(100)}%</span>
                            <span>{toFarsiNumber(0)}%</span>
                        </div>
                        <Slider
                            defaultValue={filters.agentTalk}
                            min={0}
                            max={100}
                            step={1}
                            onChange={(val) => setFilters({ ...filters, agentTalk: val })}
                        >
                            <SliderTrack bg="#D9D9D9" height="15px" borderRadius={10}>
                                <SliderFilledTrack bg="#BD5EC2" />
                            </SliderTrack>
                            <SliderThumb boxSize={6} bg="#5E5E5E" style={{ transform: 'Translate(-7px, -12px)' }} />
                        </Slider>
                    </Box>
                    <Box className="SliderWrapper">
                        <Text className="SliderLabel"> درصد صحبت مشتری : {toFarsiNumber(filters.customerTalk)}</Text>
                        <div className="SliderRange">
                            <span>{toFarsiNumber(100)}%</span>
                            <span>{toFarsiNumber(0)}%</span>
                        </div>
                        <Slider
                            defaultValue={filters.customerTalk}
                            min={0}
                            max={100}
                            step={1}
                            onChange={(val) => setFilters({ ...filters, customerTalk: val })}
                        >
                            <SliderTrack bg="#D9D9D9" height="15px" borderRadius={10}>
                                <SliderFilledTrack bg="#BD5EC2" />
                            </SliderTrack>
                            <SliderThumb boxSize={6} bg="#5E5E5E" style={{ transform: 'Translate(-7px, -12px)' }} />
                        </Slider>
                    </Box>
                    <Box className="SliderWrapper">
                        <Text className="SliderLabel"> درصد تداخل: {toFarsiNumber(filters.conflict)}</Text>
                        <div className="SliderRange">
                            <span>{toFarsiNumber(100)}%</span>
                            <span>{toFarsiNumber(0)}%</span>
                        </div>
                        <Slider
                            defaultValue={filters.conflict}
                            min={0}
                            max={100}
                            step={1}
                            onChange={(val) => setFilters({ ...filters, conflict: val })}
                        >
                            <SliderTrack bg="#D9D9D9" height="15px" borderRadius={10}>
                                <SliderFilledTrack bg="#BD5EC2" />
                            </SliderTrack>
                            <SliderThumb boxSize={6} bg="#5E5E5E" style={{ transform: 'Translate(-7px, -12px)' }} />
                        </Slider>
                    </Box>
                    <Box className="SliderWrapper">
                        <Text className="SliderLabel"> درصد تداخل در ثانیه: {toFarsiNumber(filters.conflictInSec)}</Text>
                        <div className="SliderRange">
                            <span>{toFarsiNumber(100)}%</span>
                            <span>{toFarsiNumber(0)}%</span>
                        </div>
                        <Slider
                            defaultValue={filters.conflictInSec}
                            min={0}
                            max={100}
                            step={1}
                            onChange={(val) => setFilters({ ...filters, conflictInSec: val })}
                        >
                            <SliderTrack bg="#D9D9D9" height="15px" borderRadius={10}>
                                <SliderFilledTrack bg="#BD5EC2" />
                            </SliderTrack>
                            <SliderThumb boxSize={6} bg="#5E5E5E" style={{ transform: 'Translate(-7px, -12px)' }} />
                        </Slider>
                    </Box>
                    <Box className="SliderWrapper">
                        <Text className="SliderLabel"> درصد ایجاد تداخل توسط کارشناس: {toFarsiNumber(filters.conflictByAgent)}</Text>
                        <div className="SliderRange">
                            <span>{toFarsiNumber(100)}%</span>
                            <span>{toFarsiNumber(0)}%</span>
                        </div>
                        <Slider
                            defaultValue={filters.conflictByAgent}
                            min={0}
                            max={100}
                            step={1}
                            onChange={(val) => setFilters({ ...filters, conflictByAgent: val })}
                        >
                            <SliderTrack bg="#D9D9D9" height="15px" borderRadius={10}>
                                <SliderFilledTrack bg="#BD5EC2" />
                            </SliderTrack>
                            <SliderThumb boxSize={6} bg="#5E5E5E" style={{ transform: 'Translate(-7px, -12px)' }} />
                        </Slider>
                    </Box>
                    <Box className="SliderWrapper">
                        <Text className="SliderLabel"> درصد سکوت: {toFarsiNumber(filters.silence)}</Text>
                        <div className="SliderRange">
                            <span>{toFarsiNumber(100)}%</span>
                            <span>{toFarsiNumber(0)}%</span>
                        </div>
                        <Slider
                            defaultValue={filters.silence}
                            min={0}
                            max={100}
                            step={1}
                            onChange={(val) => setFilters({ ...filters, silence: val })}
                        >
                            <SliderTrack bg="#D9D9D9" height="15px" borderRadius={10}>
                                <SliderFilledTrack bg="#BD5EC2" />
                            </SliderTrack>
                            <SliderThumb boxSize={6} bg="#5E5E5E" style={{ transform: 'Translate(-7px, -12px)' }} />
                        </Slider>
                    </Box>
                </Box>
            </div>
            <div className="FiltersSearchButton">
                <Button onClick={() => setIsFilterOpen(false)}>اعمال فیلترها</Button>
            </div>
        </div>
    )
}

export default FilterComponent