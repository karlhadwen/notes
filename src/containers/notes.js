import React from 'react';
import { Box, Text } from '@chakra-ui/core';
import { Helmet } from 'react-helmet';
import { Note } from '../components/note';

export function NotesContainer({ title, notes }) {
  return (
    <Box border="2px solid #f2f4f8" borderRadius="5px" marginBottom="20px">
      <Helmet title="Notes" />
      <Box
        display="flex"
        justifyContent="space-between"
        padding="15px 20px"
        alignItems="center"
      >
        <Text fontSize="xl" fontWeight="bold">
          {title}
        </Text>
      </Box>
      <Box>
        <Box spacing={3} backgroundColor="#f6f6fa" padding="20px">
          {notes.map((data) => (
            <Note
              key={data.attributes?.title}
              data={data}
              marginBottom="10px"
              _last={{ marginBottom: 0 }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
