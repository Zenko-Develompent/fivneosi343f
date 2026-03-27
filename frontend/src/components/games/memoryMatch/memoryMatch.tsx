"use client";

import { useMemo, useState } from "react";
import type { MemoryMatchPairDTO } from "@/app/courseTheory/types";
import styles from "./memoryMatch.module.css";

interface MemoryMatchGameProps {
  pairs: MemoryMatchPairDTO[];
}

interface MemoryCardItem {
  id: string;
  pairId: string;
  kind: "term" | "definition";
  content: string;
}

function buildCards(pairs: MemoryMatchPairDTO[]): MemoryCardItem[] {
  const termCards = pairs.map((pair) => ({
    id: `${pair.id}-term`,
    pairId: pair.id,
    kind: "term" as const,
    content: pair.term,
  }));

  const definitionCards = pairs.map((pair) => ({
    id: `${pair.id}-def`,
    pairId: pair.id,
    kind: "definition" as const,
    content: pair.definition,
  }));

  return [...termCards, ...definitionCards];
}

export default function MemoryMatchGame({ pairs }: MemoryMatchGameProps) {
  const cards = useMemo(() => buildCards(pairs), [pairs]);
  const [openedCardIds, setOpenedCardIds] = useState<string[]>([]);
  const [matchedPairIds, setMatchedPairIds] = useState<string[]>([]);
  const [isLocked, setIsLocked] = useState(false);

  const matchedCount = matchedPairIds.length;
  const isFinished = matchedCount === pairs.length && pairs.length > 0;

  const handleCardClick = (card: MemoryCardItem) => {
    if (isLocked) return;
    if (matchedPairIds.includes(card.pairId)) return;
    if (openedCardIds.includes(card.id)) return;

    if (openedCardIds.length === 0) {
      setOpenedCardIds([card.id]);
      return;
    }

    const firstCard = cards.find((item) => item.id === openedCardIds[0]);
    if (!firstCard) {
      setOpenedCardIds([card.id]);
      return;
    }

    const nextOpened = [firstCard.id, card.id];
    setOpenedCardIds(nextOpened);

    const isMatch = firstCard.pairId === card.pairId && firstCard.kind !== card.kind;
    if (isMatch) {
      setMatchedPairIds((prev) => [...prev, card.pairId]);
      setTimeout(() => setOpenedCardIds([]), 250);
      return;
    }

    setIsLocked(true);
    setTimeout(() => {
      setOpenedCardIds([]);
      setIsLocked(false);
    }, 700);
  };

  return (
    <section className={styles.wrapper}>
      <p className={styles.progress}>
        Совпадений: {matchedCount}/{pairs.length}
      </p>

      <div className={styles.grid}>
        {cards.map((card) => {
          const isMatched = matchedPairIds.includes(card.pairId);
          const isOpened = openedCardIds.includes(card.id);
          const isVisible = isMatched || isOpened;

          return (
            <button
              key={card.id}
              type="button"
              className={`${styles.card} ${isVisible ? styles.cardOpen : ""}`.trim()}
              onClick={() => handleCardClick(card)}
              disabled={isMatched || isLocked}
            >
              {isVisible ? card.content : "?"}
            </button>
          );
        })}
      </div>

      {isFinished && <p className={styles.success}>Отлично! Все пары собраны.</p>}
    </section>
  );
}
