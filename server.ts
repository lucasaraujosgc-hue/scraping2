import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import puppeteer from "puppeteer";
import fs from "fs";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Add standard middlewares
  app.use(express.json());

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/run-macro", async (req, res) => {
    const { nodes, edges } = req.body;
    
    // Respond early to avoid hanging the client
    res.json({ message: "Macro initiated in background", status: "processing" });

    // Ensure downloads dir exists
    const downloadPath = path.join(process.cwd(), 'downloads');
    if (!fs.existsSync(downloadPath)) {
      fs.mkdirSync(downloadPath);
    }

    // Run in background
    (async () => {
      let browser;
      try {
        console.log("Starting Puppeteer macro execution...");
        browser = await puppeteer.launch({
          headless: true,
          args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        
        const page = await browser.newPage();
        
        // Ensure browser allows downloading to custom path
        const client = await page.createCDPSession();
        await client.send('Page.setDownloadBehavior', {
            behavior: 'allow',
            downloadPath: downloadPath,
        });
        
        // Simple sequential execution based on array order
        // In a real scenario, this would use topological sort on 'edges'
        for (const node of nodes) {
           const label = node.data?.label || '';
           console.log(`Executing step: ${label}`);
           
           if (label.includes('Abrir URL')) {
              // Instead of arbitrary URLs, go to example for demonstration
              await page.goto('https://example.com', { waitUntil: 'networkidle2' });
              console.log("Opened example.com");
           } else if (label.includes('Aguardar (Pausa)')) {
              await new Promise(r => setTimeout(r, 2000));
              console.log("Paused for 2 seconds");
           } else if (label.includes('Preencher:')) {
              // Mock typing
              console.log(`Simulating fill: ${label}`);
              await new Promise(r => setTimeout(r, 1000));
           } else if (label.includes('Baixar Documento') || label.includes('Baixar PDF')) {
              console.log("Simulating file download via print-to-pdf...");
              // We'll actually generate a PDF from the page to simulate a real download
              await page.pdf({ path: path.join(downloadPath, `documento_${Date.now()}.pdf`), format: 'A4' });
              console.log("Document downloaded successfully.");
           } else if (label.includes('Clicar Elemento')) {
              console.log(`Simulating click: ${label}`);
              await new Promise(r => setTimeout(r, 1000));
           } else if (label.includes('Intervenção: Captcha')) {
              console.log("Simulating Captcha wait (10s fake wait)...");
              await new Promise(r => setTimeout(r, 10000));
           }
        }
        
        console.log("Macro execution completed successfully.");
      } catch (err) {
        console.error("Puppeteer Macro Error:", err);
      } finally {
        if (browser) {
          await browser.close();
          console.log("Browser closed.");
        }
      }
    })();
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production serving
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
