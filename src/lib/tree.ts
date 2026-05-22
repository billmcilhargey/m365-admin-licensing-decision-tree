// Typed wrapper around the JS decision-tree data module + shared helpers.

import { TREE as RAW_TREE, START_NODE_ID, TOTAL_MAJOR_STEPS } from "@data/tree.js";

export type DocLink = [label: string, url: string];

export type StepMeta = {
  major: number;
  sub?: number;
  subTotal?: number;
  label: string;
  secondary?: boolean;
};

export type Tone = "primary" | "secondary" | "ghost" | "warning";

export type Choice = {
  label: string;
  sublabel?: string;
  icon?: string;
  tone?: Tone;
  value?: string;
  target?: string;
  href?: string;
};

export type Action = {
  label: string;
  target?: string;
  href?: string;
  tone?: Tone;
};

export type Rationale = { why?: string; yes?: string; no?: string };

export type TreeNode = {
  step?: StepMeta;
  question?: string;
  help?: string;
  helpLink?: { label: string; target: string };
  rationale?: Rationale;
  examples?: string[];
  techDocs?: DocLink[];
  docs?: DocLink[];
  paragraphs?: string[];
  choice?: true;
  choices?: Choice[];
  info?: true;
  badge?: string;
  badgeClass?: string;
  title?: string;
  sub?: string;
  bullets?: string[];
  actions?: Action[];
  result?: true;
  yes?: string;
  no?: string;
};

export type Tree = Record<string, TreeNode>;

export const TREE: Tree = RAW_TREE as unknown as Tree;

export { START_NODE_ID, TOTAL_MAJOR_STEPS };

/** Combined docs list for a node — `docs` takes precedence over `techDocs`. */
export function docsOf(node: TreeNode | undefined): DocLink[] {
  return node?.docs ?? node?.techDocs ?? [];
}

export function treeStats(tree: Tree = TREE) {
  const nodes = Object.values(tree);
  const nodeCount = nodes.length;
  const resultCount = nodes.filter((n) => n.result).length;
  const choiceCount = nodes.filter((n) => n.choice).length;
  const infoCount = nodes.filter((n) => n.info).length;
  const questionCount = nodes.filter((n) => !n.choice && !n.info && !n.result).length;
  const docCount = nodes.reduce(
    (acc, n) => acc + (n.techDocs?.length ?? 0) + (n.docs?.length ?? 0),
    0
  );
  return { nodeCount, resultCount, choiceCount, infoCount, questionCount, docCount };
}
