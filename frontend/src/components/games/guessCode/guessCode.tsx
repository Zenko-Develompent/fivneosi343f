"use client";

import { useMemo, useState } from "react";
import type { GuessCodeQuestionDTO } from "@/app/courseTheory/types";
import HippoBad from "@/shared/assets/images/hippobad.png";
import HippoGood from "@/shared/assets/images/hippogood.png";
import Button from "@/components/button/button";
import styles from "./guessCode.module.css";

type CheckStatus = "correct" | "incorrect" | "unanswered";

interface GuessCodeGameProps {
  questions: GuessCodeQuestionDTO[];
}

function isQuestionCorrect(question: GuessCodeQuestionDTO, selectedId: string | undefined): boolean {
  if (!selectedId) return false;
  const selectedOption = question.options.find((item) => item.id === selectedId);
  return Boolean(selectedOption?.isCorrect);
}

export default function GuessCodeGame({ questions }: GuessCodeGameProps) {
  const [selectedByQuestion, setSelectedByQuestion] = useState<Record<string, string>>({});
  const [statusByQuestion, setStatusByQuestion] = useState<Record<string, CheckStatus>>({});

  const score = useMemo(
    () => Object.values(statusByQuestion).filter((status) => status === "correct").length,
    [statusByQuestion]
  );

  const handleOptionChange = (questionId: string, optionId: string) => {
    setSelectedByQuestion((prev) => ({ ...prev, [questionId]: optionId }));

    setStatusByQuestion((prev) => {
      if (!(questionId in prev)) return prev;
      const next = { ...prev };
      delete next[questionId];
      return next;
    });
  };

  const handleCheckQuestion = (question: GuessCodeQuestionDTO) => {
    const selectedId = selectedByQuestion[question.id];
    const nextStatus: CheckStatus =
      !selectedId ? "unanswered" : isQuestionCorrect(question, selectedId) ? "correct" : "incorrect";

    setStatusByQuestion((prev) => ({ ...prev, [question.id]: nextStatus }));
  };

  return (
    <section className={styles.wrapper}>
      {questions.map((question, questionIndex) => {
        const selectedId = selectedByQuestion[question.id];
        const status = statusByQuestion[question.id];

        return (
          <article key={question.id} className={styles.questionCard}>
            <p className={styles.questionTitle}>Вопрос {questionIndex + 1}</p>
            <p className={styles.questionPrompt}>{question.prompt}</p>

            <div className={styles.options}>
              {question.options.map((option) => (
                <label key={option.id} className={styles.option}>
                  <input
                    type="radio"
                    name={`guess-${question.id}`}
                    checked={selectedId === option.id}
                    onChange={() => handleOptionChange(question.id, option.id)}
                  />
                  <span>{option.label}</span>
                </label>
              ))}
            </div>

            <div className={styles.actions}>
              <Button
                title="Проверить"
                size="s"
                variant="outline"
                color="blue"
                onClick={() => handleCheckQuestion(question)}
              />
            </div>

            {status === "correct" && (
              <div className={styles.feedback}>
                <img src={HippoGood.src} alt="Верно" className={styles.feedbackImage} />
                <p className={styles.feedbackText}>Верно!</p>
              </div>
            )}

            {status === "incorrect" && (
              <div className={styles.feedback}>
                <img src={HippoBad.src} alt="Неверно" className={styles.feedbackImage} />
                <p className={styles.feedbackText}>Попробуй ещё раз.</p>
              </div>
            )}
          </article>
        );
      })}

      {Object.keys(statusByQuestion).length > 0 && (
        <p className={styles.summary}>
          Текущий результат: {score} из {questions.length}
        </p>
      )}
    </section>
  );
}
