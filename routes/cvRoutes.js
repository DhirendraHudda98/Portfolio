import express from 'express';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Download CV as PDF
router.get('/download', (req, res) => {
  try {
    const doc = new PDFDocument({ margin: 50 });
    
    // Set response headers
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=CV.pdf');
    
    // Pipe to response
    doc.pipe(res);
    
    // Title
    doc.fontSize(24).font('Helvetica-Bold').text('Dhirendra Hudda', { align: 'center' });
    doc.fontSize(12).font('Helvetica').text('Full Stack Developer', { align: 'center' });
    doc.moveDown(0.3);
    doc.fontSize(10).text('Email: dhirendrahudda@gmail.com | Phone: +91 9799279475 | Jodhpur, Rajasthan', { align: 'center' });
    doc.moveDown(0.5);
    
    // Professional Summary
    doc.fontSize(13).font('Helvetica-Bold').text('PROFESSIONAL SUMMARY');
    doc.fontSize(10).font('Helvetica').text('Passionate full-stack developer with expertise in Node.js, Express, MongoDB, and React. Skilled in building scalable web applications with modern technologies. Committed to writing clean, maintainable code and delivering exceptional user experiences.');
    doc.moveDown(0.5);
    
    // Skills
    doc.fontSize(13).font('Helvetica-Bold').text('TECHNICAL SKILLS');
    doc.fontSize(10).font('Helvetica');
    doc.text('Frontend: HTML, CSS, JavaScript, React, Tailwind CSS, EJS');
    doc.text('Backend: Node.js, Express, RESTful APIs');
    doc.text('Databases: MongoDB, Mongoose');
    doc.text('Tools: Git, GitHub, VS Code, Postman');
    doc.text('Other: PDF Generation, Authentication, Real-time Applications');
    doc.moveDown(0.5);
    
    // Experience
    doc.fontSize(13).font('Helvetica-Bold').text('PROFESSIONAL EXPERIENCE');
    doc.moveDown(0.2);
    
    doc.fontSize(11).font('Helvetica-Bold').text('Senior Full Stack Developer');
    doc.fontSize(10).font('Helvetica').text('Tech Company Inc. | Jan 2022 - Present');
    doc.fontSize(9).text('• Developed full-stack web applications using Node.js and React');
    doc.text('• Implemented database schemas and optimized queries using MongoDB');
    doc.text('• Collaborated with UI/UX designers to create responsive interfaces');
    doc.text('• Mentored junior developers and conducted code reviews');
    doc.moveDown(0.3);
    
    doc.fontSize(11).font('Helvetica-Bold').text('Full Stack Developer');
    doc.fontSize(10).font('Helvetica').text('Digital Agency | Jun 2020 - Dec 2021');
    doc.fontSize(9).text('• Built RESTful APIs using Express.js');
    doc.text('• Created responsive web pages with HTML, CSS, and JavaScript');
    doc.text('• Managed MongoDB databases and data migrations');
    doc.moveDown(0.5);
    
    // Education
    doc.fontSize(13).font('Helvetica-Bold').text('EDUCATION');
    doc.moveDown(0.2);
    doc.fontSize(11).font('Helvetica-Bold').text('Bachelor of Science in Computer Science');
    doc.fontSize(10).font('Helvetica').text('University Name | Graduation: 2020');
    doc.moveDown(0.5);
    
    // Projects
    doc.fontSize(13).font('Helvetica-Bold').text('KEY PROJECTS');
    doc.moveDown(0.2);
    doc.fontSize(10).font('Helvetica').text('CampusArena: A campus-focused platform for coding challenges, collaboration, and competitive programming (MERN Stack)');
    doc.text('BikeHub: A bike rental and management platform for browsing, booking, and managing bike services (MERN Stack)');
    doc.text('Portfolio Website: Full-stack portfolio with projects showcase and contact forms (Node.js, Express, MongoDB, React)');
    doc.moveDown(0.5);
    
    // Certifications
    doc.fontSize(13).font('Helvetica-Bold').text('CERTIFICATIONS & ACHIEVEMENTS');
    doc.fontSize(10).font('Helvetica');
    doc.text('• Full Stack Web Development Certificate - Online Course Platform');
    doc.text('• Open Source Contributor - Multiple GitHub Projects');
    doc.text('• Technical Speaker - Local Developer Meetups');
    
    // Finalize PDF
    doc.end();
    
  } catch (error) {
    console.error('PDF Generation Error:', error);
    res.status(500).send('Error generating PDF');
  }
});

export default router;
