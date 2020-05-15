import React, { useState, useEffect } from 'react';
import { CSSReset, ThemeProvider, Button, Icon, Box } from '@chakra-ui/core';
import fm from 'front-matter';
import shell from 'shelljs';
import { createWorker } from 'tesseract.js';
import customTheme from './theme';
import { NotesContainer } from './containers/notes';

const importAll = (r) => r.keys().map(r);
export const markdownFiles = importAll(
  require.context('../notes', true, /\.md$/)
)
  .sort()
  .reverse();

function groupBy(objectArray, property) {
  return objectArray.reduce(function (acc, obj) {
    const key = obj[property].collection;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, []);
}

export default function App() {
  const [collections, setCollections] = useState([]);

  const worker = createWorker({
    langPath: './lang-data',
    logger: (m) => console.log(m),
  });

  async function takeScreenshot() {
    shell.exec('/usr/sbin/screencapture -i note.png', async function () {
      await worker.load();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      const {
        data: { text },
      } = await worker.recognize(
        'https://tesseract.projectnaptha.com/img/eng_bw.png'
      );
      await worker.terminate();
      console.log(text);
    });
  }

  useEffect(() => {
    async function getNotesAndStoreInCollection() {
      const fetchedNotes = await Promise.all(
        markdownFiles.map((file) => fetch(file).then((res) => res.text()))
      ).catch((err) => console.error(err));

      const mdNotes = fetchedNotes.map((note) => fm(note));
      const userCollections = groupBy(mdNotes, 'attributes');

      setCollections(userCollections);
    }

    getNotesAndStoreInCollection();
  }, []);

  return (
    <ThemeProvider theme={customTheme}>
      <CSSReset />
      <Box height="100vh" padding="20px" width="100%" position="relative">
        {Object.keys(collections).map((collection) => (
          <NotesContainer
            key={collection}
            title={collection}
            notes={collections[collection]}
          />
        ))}

        <Button
          border="0"
          backgroundColor="#1f2023"
          position="absolute"
          bottom="20px"
          onClick={takeScreenshot}
        >
          <Icon name="add" color="white" />
        </Button>
      </Box>
    </ThemeProvider>
  );
}
