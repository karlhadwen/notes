import React, { useState } from 'react';
import { Box, Checkbox, Flex, Tag, Text } from '@chakra-ui/core';
import { Overlay } from './overlay';

export function Note({ data }) {
  const [showContent, setShowContent] = useState(false);

  return (
    <Box
      display="flex"
      flexDirection="column"
      backgroundColor="#ffffff"
      color="#3b4955"
      padding="10px 20px"
      marginTop="0"
    >
      <Flex justifyContent="space-between" width="100%">
        <Flex alignItems="center">
          <Checkbox marginRight="15px" />
          <Text cursor="pointer" onClick={() => setShowContent(!showContent)}>
            {data.attributes?.title}
          </Text>
        </Flex>
        <Tag
          backgroundColor={data.attributes?.tagBg}
          color={data.attributes?.tagColour}
        >
          {data.attributes?.category}
        </Tag>
      </Flex>
      {showContent && <Overlay data={data} setShowContent={setShowContent} />}
    </Box>
  );
}
