export const mixins = {
  // flex
  flexBox: (align = 'center', justify = 'center') => `
    display: flex;
    align-items: ${align};
    justify-content: ${justify};
  `,

  inline_flexBox: (align = 'center', justify = 'center') => `
    display: inline-flex;
    align-items: ${align};
    justify-content: ${justify};
  `,

  // positions
  positionCenterX: (type = 'absolute') => {
    if (type === 'absolute' || type === 'fixed')
      return `
        position: ${type};
        left: 50%;
        transform: translateX(-50%);
      `;
    return;
  },

  positionCenterY: (type = 'absolute') => {
    if (type === 'absolute' || type === 'fixed')
      return `
        position: ${type};
        top: 50%;
        transform: translateY(-50%);
      `;
    return;
  },

  positionCenter: (type = 'absolute') => {
    if (type === 'absolute' || type === 'fixed')
      return `
        position: ${type};
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      `;
    return;
  },
};
