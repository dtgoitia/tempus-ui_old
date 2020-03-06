import React from 'react';
import { useParams } from "react-router-dom";

import PlanEditor from '../components/PlanEditor';

export default function PlanEditorScene() {
  let { planId } = useParams();
  // TODO: add sidebar
  return <PlanEditor planId={planId} />;
}
