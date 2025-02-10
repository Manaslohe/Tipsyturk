import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTransition } from '../../contexts/TransitionContext';

const RouteTransitionHandler = ({ to, onComplete }) => {
  const navigate = useNavigate();
  const { startTransition, endTransition } = useTransition();

  useEffect(() => {
    const TOTAL_DURATION = 2000;
    const NAVIGATION_DELAY = 1000;

    startTransition();

    const navigationTimer = setTimeout(() => {
      navigate(to);
    }, NAVIGATION_DELAY);

    const completionTimer = setTimeout(() => {
      endTransition();
      if (onComplete) onComplete();
    }, TOTAL_DURATION);

    return () => {
      clearTimeout(navigationTimer);
      clearTimeout(completionTimer);
    };
  }, [to, navigate, onComplete, startTransition, endTransition]);

  return null;
};

export default RouteTransitionHandler;
