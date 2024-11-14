// pages/api/service-status.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import { exec } from 'child_process';

type Data = {
  status: string;
  message?: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const serviceName = ".NET Service 0.1";

  // PowerShell command to get the status of the service
  const command = `powershell.exe Get-Service -Name "${serviceName}" | Select-Object -ExpandProperty Status`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      res.status(500).json({ status: 'Error', message: error.message });
      return;
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      res.status(500).json({ status: 'Error', message: stderr });
      return;
    }

    const status = stdout.trim();
    res.status(200).json({ status });
  });
}
