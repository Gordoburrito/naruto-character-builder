import React from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip'
import './SkillButton.css';
// Assuming images are named after the skill names and stored in src/assets/images/
const getImage = (imageName) => {
  return process.env.PUBLIC_URL + '/images/' + imageName + '--750w.jpg'
};

const SkillButton = ({ skill, selections, onSelectOption, onDeselectOption, areRequirementsMet, skills, showName = true }) => {
  const { name, cost, requires, description, image } = skill;
  const requirementText = requires ? `Requires: ${Array.isArray(requires) ? requires.join(', ') : requires}` : '';

  const getTooltipText = () => {
    let tooltip = `${name} - Cost: ${cost}`;
    if (description) {
      tooltip += `\nDescription: ${description}`;
    }
    if (requirementText) {
      tooltip += `\n${requirementText}`;
    }
    if (isDisabled()) {
      // tooltip += `\nNot available due to unmet requirements or insufficient budget.`;
    }
    return tooltip;
  };

  const getButtonColor = () => {
    if (selections[name]) {
      return 'yellow'; // Selected
    } else if (isDisabled()) {
      return 'gray'; // Not available
    }
    return 'green'; // Available
  };

  const isDisabled = () => {
    if (selections[name] || cost > selections.budget) {
      return true;
    }
    return requires && !areRequirementsMet(requires);
  };

  const handleClick = () => {
    if (selections[name]) {
      onDeselectOption(skill);
    } else {
      onSelectOption(skill);
    }
  };

  return (
    <>
      <div className="skill-button">
        <button
          key={name}
          onClick={handleClick}
          style={{
            position: 'relative',
            borderWidth: '2px',
            borderStyle: 'solid',
            borderColor: getButtonColor() === 'yellow' ? 'yellow' : getButtonColor() === 'gray' ? 'gray' : 'green',
            cursor: 'pointer'
          }}
          data-tooltip-id={`tooltip-${name}`}
        >
          <img src={getImage(image)} alt={name} className="skill-button__img" />
          <div className="skill-button__cost">
            ${cost}
          </div>
        </button>
        {showName && <span className="skill-button__name">{name} {requirementText ? ` (${requirementText})` : ''}</span>}
      </div>
      <ReactTooltip id={`tooltip-${name}`} className="skill-button__tooltip" place="top" effect="solid">
        {getTooltipText().split('\n').map((item, index) => (
          <div key={index} className="skill-button__tooltip-item">{item}</div>
        ))}
      </ReactTooltip>
    </>
  );
};

export default SkillButton;
