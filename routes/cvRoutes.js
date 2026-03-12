import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Download CV as PDF — serve the actual uploaded CV file
router.get('/download', (req, res) => {
  try {
    const cvPath = path.join(__dirname, '..', 'Cv.pdf');
    
    if (!fs.existsSync(cvPath)) {
      return res.status(404).send('CV not found');
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=Dhirendra_Hudda_CV.pdf');
    
    const stream = fs.createReadStream(cvPath);
    stream.pipe(res);
  } catch (error) {
    console.error('CV Download Error:', error);
    res.status(500).send('Error downloading CV');
  }
});

export default router;
