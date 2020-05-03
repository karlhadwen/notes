import React, { useState, useEffect } from 'react';
import { CSSReset, ThemeProvider, Button, Icon, Box } from '@chakra-ui/core';
import fm from 'front-matter';
import customTheme from './theme';
import { NotesContainer } from './containers/notes';
import { markdownFiles } from './utils/getNotes';

export default function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    async function getNotes() {
      const fetchedNotes = await Promise.all(
        markdownFiles.map((file) => fetch(file).then((res) => res.text()))
      ).catch((err) => console.error(err));

      setNotes(fetchedNotes.map((note) => fm(note)));
    }

    getNotes();
  }, []);

  return (
    <ThemeProvider theme={customTheme}>
      <CSSReset />
      <Box height="100vh" padding="20px" width="100%" position="relative">
        <NotesContainer title="Core" notes={notes} />
        <NotesContainer title="Development" notes={notes} />

        <Button
          border="0"
          backgroundColor="#1f2023"
          position="absolute"
          bottom="20px"
        >
          <Icon name="add" color="white" />
        </Button>
      </Box>
    </ThemeProvider>
  );
}
