import styled from 'styled-components';

const SwatchWrapperSC = styled.div`
    background-color: ${props => props.bg ?? 'transparent'};
`;

export default SwatchWrapperSC;