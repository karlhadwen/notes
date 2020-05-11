import React from 'react';
import ReactDOM from 'react-dom';
import { Button, Box, Flex, Tag, Text } from '@chakra-ui/core';
import ReactMarkdown from 'react-markdown/with-html';
import { Helmet } from 'react-helmet';

export const closeButtonPsuedoElements = (direction) => ({
  transform: `rotate(${direction})`,
  position: 'absolute',
  left: '10px',
  top: '0',
  content: '" "',
  height: '22px',
  width: '2px',
  background: '#333',
});

export function Overlay({ attributes, body, setShowContent }) {
  return ReactDOM.createPortal(
    <Flex>
      <Helmet title={attributes?.title} />
      <Box
        background="white"
        position="fixed"
        top="0"
        left="0"
        width="100%"
        height="100%"
        margin="auto"
        padding="20px"
      >
        <Box marginBottom="10px">
          <Flex alignItems="center">
            <Text fontSize="2xl" fontWeight="bold">
              {attributes?.title}
            </Text>
            <Tag
              backgroundColor={attributes?.tagBg}
              color={attributes?.tagColour}
              marginLeft="10px"
            >
              {attributes?.category}
            </Tag>
          </Flex>
        </Box>
        <ReactMarkdown escapeHtml={false} source={body} marginBottom="20px" />
        <Button
          onClick={() => setShowContent(false)}
          position="absolute"
          right="15px"
          top="15px"
          width="22px"
          height="22px"
          opacity="0.3"
          backgroundColor="transparent"
          border="0"
          cursor="pointer"
          _hover={{ opacity: 1 }}
          _before={{
            ...closeButtonPsuedoElements('45deg'),
          }}
          _after={{
            ...closeButtonPsuedoElements('-45deg'),
          }}
        />
      </Box>
    </Flex>,
    document.body
  );
}
