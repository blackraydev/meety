import styled from 'styled-components';

export const Participant = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  position: relative;

  &:not(:first-of-type) {
    margin-top: 15px;
  }
`;

export const ParticipantPhoto = styled.div`
  transition: 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  background: ${({ theme }) => theme.colors.main};
  margin-right: 10px;
  border-radius: 50%;
`;

export const ParticipantPhotoLabel = styled.span`
  transition: 0.3s ease;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.primaryText};
`;

export const ParticipantData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const ParticipantName = styled.span`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.primaryText};
`;

export const YouText = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray};
  margin-left: 6px;
`;

export const ParticipantRole = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.gray};
`;

export const ParticipantMedia = styled.div`
  position: absolute;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 15px;
  height: 100%;
  right: 0;
`;
