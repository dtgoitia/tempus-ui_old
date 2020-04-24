import React from "react";
import styled from "styled-components";
import { Icon } from "semantic-ui-react";

const Container = styled.div`
  margin: 2rem;
`;

export const entryType = {
  LOOP: "loop",
  PREP: "prep",
  REST: "rest",
  WORK: "work",
};

function parseSingleGoal(goal, loopIndex = null) {
  return {
    exerciseId: goal.exercise.id,
    index: loopIndex ? loopIndex : goal.goalIndex,
    duration: goal.duration,
    repetitions: goal.repetitions,
    type: entryType[goal.exercise.exerciseType],
    name: goal.exercise.name,
    description: goal.exercise.description,
    pause: goal.pause,
  };
}

function parseLoopGoals(goals) {
  return goals.map(parseSingleGoal);
}

export function flattenPlan(loops) {
  return loops.map((loop, i) => {
    const isLoop = loop.goals.length > 1;
    return isLoop
      ? {
          index: i,
          rounds: loop.rounds,
          type: entryType.LOOP,
          entries: parseLoopGoals(loop.goals),
        }
      : parseSingleGoal(loop.goals[0], loop.loopIndex);
  });
}

// TODO move this out
const iconMapper = {
  [entryType.LOOP]: "recycle",
  [entryType.PREP]: "external square alternate",
  [entryType.REST]: "download",
  [entryType.WORK]: "folder",
};

const INDENTATION = 4;  // rem
const LONG_HYPHEN = '—';

// TODO: move this to a central place
const colour1 = "blue";
const entryBarColours = {
  [entryType.LOOP]: "red",
  [entryType.PREP]: "yellow",
  [entryType.REST]: "blue",
  [entryType.WORK]: "#aaa",
};


const StyledEntryTypeBar = styled(EntryTypeBar)`
  order: -1;
  flex: 0 0 .5rem;
  background-color: ${props => entryBarColours[props.type]};
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
`;
function EntryTypeBar({type, className}) {
  return <div className={className}></div>;
}


const StyledEntryTypeIcon = styled(EntryTypeIcon)`
  flex: 0 0 2em;
  margin: 0;
`;
function EntryTypeIcon({type, className}) {
  return <Icon className={className} name={iconMapper[type]} />;
}


const StyledPauseIcon = styled(PauseIcon)`
  flex: 0 0 2rem;
  margin: 0;
`;
function PauseIcon({pause, className}) {
  // TODO: replace the 'play' icon for a pause with a diagonal line
  // TODO: add on click functionality, with the dispatch, etc.
  return <Icon className={className} name={pause ? 'pause' : 'play'} />;
}


const StyledIcons = styled(Icons)`
  order: 1;
  flex: 0 0 4rem;
  height: 100%;
  margin: -.15rem .6rem 0 .5rem;

  display: flex;
  align-items: center;
`;
function Icons({type, pause, className}) {
  return (
    <div className={className}>
      <StyledEntryTypeIcon type={type} />
      <StyledPauseIcon pause={pause} />
    </div>
  );
}


const StyledEntryDescription = styled(EntryDescription)`
  order: 2;
  flex: 1 1 auto;
  align-self: center;

  padding: 0 .25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
function EntryDescription({text, className}) {
  return <div className={className}>{text}</div>;
}
const StyledEntryAnnotation = styled(EntryAnnotation)`
  order: 3;
  flex: 0 0 50px;
  align-self: center;

  padding: 0 .25rem;
`;
function EntryAnnotation({text, className}) {
  if (text === null || text === undefined)  {
    text = LONG_HYPHEN
  }
  return <div className={className}>{text}</div>;
}


const StyledEntryTime = styled(EntryTime)`
  order: 99;
  flex: 0 0 100px;
  align-self: center;

  text-align: right;
`;
function EntryTime({seconds, className}) {
  if (!seconds) {
    return null;
  }

  const date = new Date(0, 0, 0, 0, 0, seconds);
  const h = date.getHours();
  const m = date.getMinutes();
  const s = date.getSeconds();
  const time = [
    h > 0 ? `${h}h` : null,
    m > 0 || h > 0 ? `${m}m` : null,
    `${s}s`,
  ].join(' ');
  return <div className={className}>{time}</div>;
}


const StyledBaseEntry = styled(BaseEntry)`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: right;
  align-items: stretch;
  align-content: stretch;

  height: 3rem;
  margin: .3rem;
  padding: .3rem .8rem .3rem .3rem;
  border: 1px solid black;
  background-color: white;

  border-radius: 6px;
`;
const StyledBaseEntryContainer = styled.div`
  display: block;
`;
function BaseEntry({indented, type, pause, description, duration, children, className}) {
  const indentedStyle = indented
    ? { style: {marginLeft: `${INDENTATION}rem`}}
    : {};

  return (
    <StyledBaseEntryContainer {...indentedStyle}>
      <div className={className}>
        <StyledEntryTypeBar type={type} />
        <StyledIcons type={type} pause={pause} />
        <StyledEntryDescription text={description}/>
        <StyledEntryAnnotation text={''}/>
        <StyledEntryTime seconds={duration}/>
      </div>
      { (!indented && children) ? children : null}
    </StyledBaseEntryContainer>
  );
}

function Subentry(props) {
  return <StyledBaseEntry indented {...props} />;
}

function LoopEntry({ rounds, pause, entries: subentries}) {
  const duration = rounds * (
    subentries.reduce((total, entry) => total + entry.duration, 0)
  );

  return (
    <StyledBaseEntry
      type={entryType.LOOP}
      pause={pause}
      description={`rounds: ${rounds}`}
      duration={duration}
    >
      { subentries.map(entry => <Subentry {...entry}/>) }
    </StyledBaseEntry>
  );
}

const StyledEntry = styled(Entry)`
  margin: .3rem;
  padding: .7rem;
  border: 1px solid ${colour1}
`;

function Entry({ entry, indented }) {
  if (entry.type === entryType.LOOP) {
    return <LoopEntry {...entry} />;
  }

  return <StyledBaseEntry indented={indented} entry={entry} />;
}

function sortEntriesByIndex(entry1, entry2) {
  if (entry1.index === entry2.index) {
    new Error("2 entries must not have the same");
  }
  return entry1.index > entry2.index ? 1 : -1;
}

function Entries({ entries, className }) {
  console.dir(entries);
  return (
    <div className={className}>
      {entries.sort(sortEntriesByIndex).map((entry) => (
        <StyledEntry key={entry.index} entry={entry} />
      ))}
    </div>
  );
}

// TODO: center them horizontally
const StyledEntries = styled(Entries)`
  border: 3px solid #aaa;
  min-width: 600px;
`;

export default function Plan({
  plan: { id, name, description, created, lastUpdated, loops },
}) {
  const entries = flattenPlan(loops);
  return (
    <Container className="plan-editor">
      <h3>{name}</h3>
      <p>Last updated: {lastUpdated.toISOString()}</p>
      <p>Description: {description}</p>
      <StyledEntries entries={entries} />
    </Container>
  );
}
