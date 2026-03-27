"use client";

import { useMemo, useState } from "react";
import type { FixCodeTaskDTO } from "@/app/courseTheory/types";
import HippoBad from "@/shared/assets/images/hippobad.png";
import HippoGood from "@/shared/assets/images/hippogood.png";
import Button from "@/components/button/button";
import styles from "./fixCode.module.css";

type TaskStatus = "correct" | "incorrect" | "unanswered";

interface FixCodeGameProps {
  tasks: FixCodeTaskDTO[];
}

function isTaskCorrect(task: FixCodeTaskDTO, selectedId: string | undefined): boolean {
  if (!selectedId) return false;
  const selectedOption = task.options.find((item) => item.id === selectedId);
  return Boolean(selectedOption?.isCorrect);
}

export default function FixCodeGame({ tasks }: FixCodeGameProps) {
  const [selectedByTask, setSelectedByTask] = useState<Record<string, string>>({});
  const [statusByTask, setStatusByTask] = useState<Record<string, TaskStatus>>({});

  const score = useMemo(
    () => Object.values(statusByTask).filter((status) => status === "correct").length,
    [statusByTask]
  );

  const handleTaskCheck = (task: FixCodeTaskDTO) => {
    const selectedId = selectedByTask[task.id];
    const nextStatus: TaskStatus =
      !selectedId ? "unanswered" : isTaskCorrect(task, selectedId) ? "correct" : "incorrect";

    setStatusByTask((prev) => ({ ...prev, [task.id]: nextStatus }));
  };

  return (
    <section className={styles.wrapper}>
      {tasks.map((task, index) => {
        const selectedId = selectedByTask[task.id];
        const status = statusByTask[task.id];

        return (
          <article key={task.id} className={styles.taskCard}>
            <p className={styles.taskTitle}>Задание {index + 1}</p>
            <p className={styles.taskPrompt}>{task.prompt}</p>
            <pre className={styles.codeBlock}>{task.brokenCode}</pre>

            <div className={styles.options}>
              {task.options.map((option) => (
                <label key={option.id} className={styles.option}>
                  <input
                    type="radio"
                    name={`fix-task-${task.id}`}
                    checked={selectedId === option.id}
                    onChange={() => {
                      setSelectedByTask((prev) => ({ ...prev, [task.id]: option.id }));
                      setStatusByTask((prev) => {
                        if (!(task.id in prev)) return prev;
                        const next = { ...prev };
                        delete next[task.id];
                        return next;
                      });
                    }}
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
                onClick={() => handleTaskCheck(task)}
              />
            </div>

            {status === "correct" && (
              <div className={styles.feedback}>
                <img src={HippoGood.src} alt="Верно" className={styles.feedbackImage} />
                <p className={styles.feedbackText}>Отлично исправлено!</p>
              </div>
            )}

            {status === "incorrect" && (
              <div className={styles.feedback}>
                <img src={HippoBad.src} alt="Неверно" className={styles.feedbackImage} />
                <p className={styles.feedbackText}>Есть ошибка, попробуй снова.</p>
              </div>
            )}
          </article>
        );
      })}

      {Object.keys(statusByTask).length > 0 && (
        <p className={styles.summary}>
          Исправлено верно: {score} из {tasks.length}
        </p>
      )}
    </section>
  );
}
