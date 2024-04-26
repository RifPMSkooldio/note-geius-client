type KeyConcept = {
  key: string
  meaning: string
  parentKey: string | null
}

type BulletData = {
  summary: {
    content: string
    keyConcept: KeyConcept[]
  }
}

export type { KeyConcept, BulletData }
