import express from 'express';
import diaryService from '../services/diaryService';
import toNewDiaryEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diaryService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
  // const { date, weather, visibility, comment } = req.body;

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const newDiaryEntry = toNewDiaryEntry(req.body);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const addedEntry = diaryService.addEntry(newDiaryEntry);
    res.json(addedEntry);
  } catch(error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.get('/:id', (req, res) => {
  const diary = diaryService.findById(Number(req.params.id));

  if (diary) {
    res.send(diary);
  } else {
    res.sendStatus(404);
  }
});

export default router;