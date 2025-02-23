import { Box, Flex, Text, Grid, GridItem, Divider } from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { ChatIcon } from '@chakra-ui/icons';
import { InfoIcon } from '@chakra-ui/icons';

import {
  IconButton, Slider, SliderTrack, SliderFilledTrack, SliderThumb
} from '@chakra-ui/react';
import {
  ChevronRightIcon as PlayIcon,
  ChevronLeftIcon as PauseIcon
} from '@chakra-ui/icons';

import './style.scss';
import { Key, useRef, useState } from 'react';

const CallDetails = () => {
  const location = useLocation();
  const callDetails = location.state?.call;
  // const toast = useToast();

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  if (!callDetails) {
    return <Text>جزئیات تماس یافت نشد.</Text>;
  }

  // Parse prohibited words from string to array
  const prohibitedWords = callDetails.prohibited_words ? JSON.parse(callDetails.prohibited_words) : [];

  // const handleCopyToClipboard = (value: string) => {
  //   navigator.clipboard.writeText(value);
  //   toast({
  //     title: 'کپی شد!',
  //     status: 'success',
  //     duration: 2000,
  //     isClosable: true,
  //   });
  // };

  // Utility functions to add
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const togglePlay = () => {
    if (audioRef.current) {
      isPlaying ? audioRef.current.pause() : audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(progress);
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (value: number) => {
    if (audioRef.current) {
      const seekTime = (value / 100) * audioRef.current.duration;
      audioRef.current.currentTime = seekTime;
      setProgress(value);
    }
  };

  return (
    <Flex className="call-details-page" gap="6" p="6" bg="gray.50" style={{ direction: 'rtl' }}>
      <Box flex="2">
        {/* Case Overview Section */}
        <Flex gap="6" mb="6" flexDirection={['column']} justifyContent={'space-between'} height={'100%'}>
          <Box flex="1" bg="white" p="6" borderRadius="lg" boxShadow="sm">
            <Flex align="center" mb="4">
              <Text fontSize="lg" fontWeight="bold" aria-label="بررسی کلی تماس">بررسی کلی تماس</Text>
            </Flex>
            <Grid templateColumns="repeat(2, 1fr)" gap="4">
              <GridItem>
                <Text fontSize="xs" color="gray.500">شناسه تماس</Text>
                <Text fontWeight="bold">{callDetails.call_id}</Text>
              </GridItem>
              <GridItem>
                <Text fontSize="xs" color="gray.500">مدت زمان</Text>
                <Text fontWeight="bold">{callDetails.duration} ثانیه</Text>
              </GridItem>
              <GridItem>
                <Text fontSize="xs" color="gray.500">وضعیت</Text>
                <Text fontWeight="bold">{callDetails.status}</Text>
              </GridItem>
              <GridItem>
                <Text fontSize="xs" color="gray.500">صف</Text>
                <Text fontWeight="bold">{callDetails.queue}</Text>
              </GridItem>
            </Grid>
          </Box>

          <Box flex="1" bg="white" p="6" borderRadius="lg" boxShadow="sm">
            <Flex mb="4">
              <Text fontSize="lg" fontWeight="bold" aria-label="جزئیات تماس">جزئیات تماس</Text>
              {/* <MdContentCopy color="purple.500" style={{ marginRight: '5px', marginTop: '4px' }} /> */}
            </Flex>
            <Grid templateColumns="1fr" gap="4">
              <GridItem>
                <Text fontSize="xs" color="gray.500">برچسب تماس</Text>
                <Text fontWeight="bold" fontSize="sm">{callDetails.call_tag}</Text>
              </GridItem>
              <GridItem>
                <Text fontSize="xs" color="gray.500">موضوع تماس</Text>
                <Text fontWeight="bold" fontSize="sm">{callDetails.call_topic}</Text>
              </GridItem>
              <GridItem>
                <Text fontSize="xs" color="gray.500">لحن مشتری</Text>
                <Text fontWeight="bold" fontSize="sm" color="red.500">{callDetails.customer_tone}</Text>
              </GridItem>
              <GridItem>
                <Text fontSize="xs" color="gray.500">کلمات ممنوعه</Text>
                <Text fontWeight="bold" fontSize="sm">{prohibitedWords.length > 0 ? prohibitedWords.join(', ') : 'هیچ'}</Text>
              </GridItem>
            </Grid>
          </Box>
        </Flex>
      </Box>

      {/* Call Transcript */}
      <Box flex="1.5" bg="white" p="6" borderRadius="lg" boxShadow="sm">
        <Flex align="center" mb="4">
          <ChatIcon mr="2" color="purple.500" ml='2' mt='0.5' />
          <Text fontSize="lg" fontWeight="bold" aria-label="متن تماس">متن تماس</Text>
        </Flex>

        <Box mt="4" bg="gray.100" p="6" borderRadius="lg" maxHeight="500px" overflowY="auto">
          <Flex mb="4" align="center">
            <Text fontSize="xs" fontWeight="bold" color="blue.500">مشتری: {callDetails.customer_call_text}</Text>
          </Flex>
          <Flex mb="4" align="center">
            <Text fontSize="xs">کارشناس: {callDetails.agent_call_text}</Text>
          </Flex>
        </Box>

        {/* Audio Player Section */}
        <Box mt="4" bg="gray.50" p="4" borderRadius="lg">
          {/* Hidden Audio Element */}
          <audio
            ref={audioRef}
            src={callDetails.audio_url}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
          />

          {/* Audio Controls */}
          <Flex align="center" gap="4">
            <IconButton
              size="sm"
              variant="outline"
              colorScheme="purple"
              aria-label={isPlaying ? 'Pause' : 'Play'}
              icon={isPlaying ? <PauseIcon /> : <PlayIcon />}
              onClick={togglePlay}
            />

            <Box flex="1">
              <Slider
                aria-label="audio-progress"
                colorScheme="purple"
                value={progress}
                onChange={handleSeek}
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </Box>

            <Text fontSize="xs" color="gray.500" width="100px" textAlign="left">
              {formatTime(currentTime)} / {formatTime(duration)}
            </Text>
          </Flex>
        </Box>
      </Box>

      <Box flex="1.5" bg="white" p="6" borderRadius="lg" boxShadow="sm">
        <Flex align="center" mb="0">
          <InfoIcon mr="2" color="purple.500" ml="2" mt="0.5" />
          <Text fontSize="lg" fontWeight="bold" aria-label="تحلیل صوت">تحلیل صوت</Text>
        </Flex>
        <Box bg="white" p="6">
          <Grid templateColumns="1fr" gap="6">
            {/* Summary */}
            <GridItem>
              <Text fontSize="s" color="gray.500" mb="1">خلاصه</Text>
              <Text fontWeight="bold" fontSize="md" color="gray.800">{callDetails.call_summary}</Text>
            </GridItem>
            <Box my="3">
              <Divider borderColor="gray.200" />
            </Box>

            {/* Final Intent */}
            <GridItem>
              <Text fontSize="s" color="gray.500" mb="1">هدف نهایی شناسایی‌شده</Text>
              <Flex alignItems="center" gap="2">
                <Text fontWeight="bold" fontSize="md" color="purple.800">{callDetails.call_topic}</Text>
              </Flex>
            </GridItem>
            <Box my="3">
              <Divider borderColor="gray.200" />
            </Box>

            {/* Keywords */}
            <GridItem>
              <Text fontSize="s" color="gray.500" mb="1">کلمات کلیدی</Text>
              <Flex wrap="wrap" gap="2">
                {callDetails.word_cloud
                  .replace(/[\[\]]/g, '')
                  .split(',')
                  .map((word: string, index: Key | null | undefined) => (
                    <Box
                      key={index}
                      as="span"
                      bg="blue.100"
                      color="blue.700"
                      px="2"
                      py="1"
                      borderRadius="md"
                      fontSize="xs"
                    >
                      {word.trim()}
                    </Box>
                  ))}
              </Flex>
            </GridItem>
          </Grid>
        </Box>
      </Box>
    </Flex>
  );
};

export default CallDetails;
