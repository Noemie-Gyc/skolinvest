import fs from 'fs';
import path from 'path';

interface LintMessage {
  line: number;
  ruleId: string | null;
}

interface LintFileResult {
  filePath: string;
  messages: LintMessage[];
}

function readJSON(filePath: string): LintFileResult[] {
  return JSON.parse(fs.readFileSync(path.resolve(filePath), 'utf-8'));
}

const baseline = readJSON('eslint-baseline.json');
const current = readJSON('eslint-current.json');

const format = (f: string, l: number, r: string | null) => `${f}:${l}:${r}`;
const baselineSet = new Set(
  baseline.flatMap(f => f.messages.map(m => format(f.filePath, m.line, m.ruleId)))
);

const newErrors = current.flatMap(f =>
  f.messages.filter(m => !baselineSet.has(format(f.filePath, m.line, m.ruleId)))
);

if (newErrors.length > 0) {
  console.error(`❌ ESLint found ${newErrors.length} new error(s) not in the baseline.`);
  process.exit(1);
} else {
  console.log('✅ No new ESLint errors compared to baseline.');
}
