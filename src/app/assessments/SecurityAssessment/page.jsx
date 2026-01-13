"use client";

import React, { useState, useEffect } from "react";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";

// Simplified Progress Bar
const ProgressBar = ({ current, total }) => {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;
  return (
    <div className="w-full mb-6">
      <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="mt-2 text-right text-xs text-gray-500">
        {percentage}% Complete ({current}/{total})
      </div>
    </div>
  );
};

const SecurityAssessment = () => {
  const router = useRouter();
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await api.getQuestions();
        if (Array.isArray(data)) setQuestions(data);
        else if (data.questions) setQuestions(data.questions);
        else setQuestions([]);
      } catch (error) {
        console.error("Failed to load questions:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const currentQuestion = questions[currentIndex];
  // Helper to handle option selections
  const handleSelect = (index) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion._id]: index }));
    if (showWarning) setShowWarning(false);
  };

  const handleNext = async () => {
    // Check if an answer is selected (it's stored as an index number)
    const answer = answers[currentQuestion._id];
    if (answer === undefined || answer === null) {
      setShowWarning(true);
      return;
    }

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      await handleSubmit();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const payload = {
        domain: "new-api.internal.io",
        answers: Object.entries(answers).map(([qId, optIndex]) => ({
          questionId: qId,
          selectedOption: optIndex, // Sends the index (0, 1, 2)
        })),
      };
      await api.submitAssessment(payload);
      router.push("/assessments");
    } catch (error) {
      alert("Failed to submit assessment.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader message="Loading..." />;
  if (!currentQuestion) return <div className="text-white p-10 text-center">No questions found.</div>;

  const selectedOptionIndex = answers[currentQuestion._id];

  return (
      <main className="min-h-screen bg-[#0f1115] flex flex-col items-center justify-center p-6 text-white w-screen">
        
        {/* Warning Modal */}
        {showWarning && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-[#1c1f24] p-6 rounded-lg max-w-sm w-full text-center border border-gray-800">
              <p className="text-gray-300 mb-4">Please select an answer to continue.</p>
              <button
                onClick={() => setShowWarning(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm font-medium transition"
              >
                Okay
              </button>
            </div>
          </div>
        )}

        <div className="max-w-2xl w-full">
          {/* Header Controls */}
          <div className="flex justify-between items-end mb-6">
            <span className="text-blue-400 text-xs font-bold tracking-wider uppercase">
              {currentQuestion.category_name || "General"}
            </span>
            <button 
              onClick={() => router.push("/assessments")}
              className="text-gray-500 hover:text-white text-xs transition"
            >
              Exit
            </button>
          </div>

          <ProgressBar current={currentIndex + 1} total={questions.length} />

          {/* Question */}
          <h2 className="text-2xl font-semibold mb-8 text-gray-100 leading-snug">
            {currentQuestion.question_text}
          </h2>

          {/* Options - Simplified List */}
          <div className="space-y-3 mb-10">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedOptionIndex === index;
              return (
                <button
                  key={index}
                  onClick={() => handleSelect(index)}
                  className={`
                    w-full text-left p-4 rounded-lg transition-all duration-200 border
                    ${isSelected 
                      ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-900/20" 
                      : "bg-[#16181c] border-transparent text-gray-400 hover:bg-[#1c1f24] hover:text-gray-200"
                    }
                  `}
                >
                  <span className={`font-mono mr-3 ${isSelected ? "text-blue-200" : "text-gray-600"}`}>
                    {option.option_key}.
                  </span>
                  {option.option_text}
                </button>
              );
            })}
          </div>

          {/* Footer Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`text-sm font-medium transition ${
                currentIndex === 0 ? "text-gray-700 cursor-not-allowed" : "text-gray-400 hover:text-white"
              }`}
            >
              Previous
            </button>

            <button
              onClick={handleNext}
              disabled={submitting}
              className="bg-white text-black px-8 py-2.5 rounded-full font-bold hover:bg-gray-200 transition disabled:opacity-50"
            >
              {submitting ? "Sending..." : currentIndex === questions.length - 1 ? "Finish" : "Next"}
            </button>
          </div>
        </div>
      </main>
  );
};

export default SecurityAssessment;