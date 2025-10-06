import { useState, useEffect, useRef } from 'react';
import { Box } from '@chakra-ui/react';
import AstroBackground from '../components/QuizPage/AstroBackground';
import QuizIntro from '../components/QuizPage/QuizIntro';
import QuestionCard from '../components/QuizPage/QuestionCard';
import AnswerFeedback from '../components/QuizPage/AnswerFeedback';
import QuizResults from '../components/QuizPage/QuizResults';
import BadgeView from '../ImagesViews/BadgeView';
import NavBar from '../components/Commond/NavBar';
import quizData from '../utils/quizData';
import Footer from '../components/Commond/Footer';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const quizDataShuffled = quizData.map(q => {
  const shuffledOptions = shuffleArray([...q.options]);
  return {
    ...q,
    options: shuffledOptions
  };
});

export default function QuizPage() {
  const [stage, setStage] = useState('intro');
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  // Ref para BadgeView
  const badgeRef = useRef(null);

 useEffect(() => {
  const shuffledQuestions = shuffleArray(quizDataShuffled); // usa quizDataShuffled
  setSelectedQuestions(shuffledQuestions.slice(0, 10));
}, []);

  const handleSelect = (opt) => {
    if (!selectedQuestions.length) return; // previene errores al inicio
    const isCorrect = opt === selectedQuestions[current].answer;
    setCorrect(isCorrect);
    setShowFeedback(true);
    if (isCorrect) setScore((prev) => prev + 1);

    setTimeout(() => {
      setShowFeedback(false);

      setCurrent((prev) => {
        if (prev + 1 < selectedQuestions.length) {
          return prev + 1;
        } else {
          setStage('results');
          return prev; // no importa, ya estamos en resultados
        }
      });
    }, 1200);
  };

  return (
    <>
      <NavBar />
      <AstroBackground />

      {/* Contenedor principal */}
      <Box
        position="relative"
        zIndex={2}
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        px={4}
      >
        {/* Etapa de introducción */}
        {stage === 'intro' && (
          <Box position="relative" zIndex={3}>
            <QuizIntro onStart={() => setStage('quiz')} />
          </Box>
        )}

        {/* Etapa del quiz */}
        {stage === 'quiz' && (
          <Box position="relative" zIndex={3}>
            {!showFeedback && selectedQuestions[current] && (
              <QuestionCard
                question={selectedQuestions[current].q}
                options={selectedQuestions[current].options}
                current={current + 1}
                total={selectedQuestions.length}
                onSelect={handleSelect}
              />
            )}

            {showFeedback && (
              <Box
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                zIndex={10}
              >
                <AnswerFeedback correct={correct} />
              </Box>
            )}
          </Box>
        )}

        {/* Etapa de resultados */}
        {stage === 'results' && (
          <Box position="relative" zIndex={5}>
            <QuizResults
              score={score}
              total={selectedQuestions.length}
              badgeRef={badgeRef} // Pasamos el ref al componente de resultados
              onRestart={() => {
                setStage('intro');
                setScore(0);
                setCurrent(0);
              }}
            />
          </Box>
        )}

        {/* BadgeView oculto para descarga */}
        <Box display="none">
          <BadgeView
            ref={badgeRef}
            title="¡Felicidades!"
            teamImage="/public/assets/images/BadVoids-Logo-White-removebg-preview.png"
            logoImage="/public/assets/images/Main_Logo-removebg-preview.png"
            badgeImage="/public/assets/images/Badge-removebg-preview.png"
          />
        </Box>
      </Box>
      <Footer />
    </>
  );
}
