const { spawn } = require('child_process');
const path = require('path');

const runPythonScript = (script, args, res) => {
  const process = spawn('python', [path.join(__dirname, `../python-scripts/${script}`), ...args]);
  let dataToSend = '';
  process.stdout.on('data', (data) => {
    dataToSend += data.toString();
  });
  process.stderr.on('data', (err) => {
    console.error(`Python error: ${err}`);
  });
  process.on('close', (code) => {
    try {
      const json = JSON.parse(dataToSend);
      res.json(json);
    } catch (err) {
      res.status(500).json({ error: 'Failed to parse response from Python script.' });
    }
  });
};

exports.getStateResults = (req, res) => {
  const state = req.query.state || '';
  runPythonScript('election_analysis.py', [state], res);
};

exports.getWinningProbability = (req, res) => {
  const candidate = req.query.candidate || '';
  runPythonScript('election_model.py', [candidate], res);
};

exports.getSentimentAnalysis = (req, res) => {
  const candidate = req.query.candidate || '';
  runPythonScript('model-2.py', [candidate], res);
};
