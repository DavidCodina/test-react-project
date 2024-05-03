import styled from 'styled-components'

export const SCRibbonContainer = styled.div`
  height: 88px;
  overflow: hidden;
  position: absolute;
  right: -3px;
  top: -3px;
  width: 85px;

  .ms-ribbon {
    align-items: center;
    background-color: #409;
    background-image: linear-gradient(90deg, #5f2ba5, #00affa);
    box-shadow:
      0px 1px 1px rgba(0, 0, 0, 0.5),
      inset 0px 0px 0px 0.5px #409;
    box-sizing: border-box;
    color: #fff;
    display: flex;
    font-family: inherit;
    font-size: 14px;
    font-weight: 800;
    height: 31.5px;
    justify-content: center;
    left: -5px;
    letter-spacing: 0.5px;
    line-height: 1;
    position: relative;
    text-align: center;
    text-shadow: rgba(255, 255, 255, 0.5) 0px 1px 0px;
    top: 15px;
    transform: rotate(45deg);
    width: 120px;
  }

  .ms-ribbon:before,
  .ms-ribbon:after {
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
    border-top: 3px solid #409;
    bottom: -3px;
    content: '';
    position: absolute;
  }

  .ms-ribbon:before {
    left: 0;
  }

  .ms-ribbon:after {
    right: 0;
  }
`
