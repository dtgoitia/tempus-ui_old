import React from 'react';

export default function PlanEditor({ planId }) {
  return (
    <div>
      Hi! I am a plan editor. I will show what is inside the selected plan and help you edit it
      <div>{ planId ? planId : 'no ID found'}</div>
    </div>
  );
}
