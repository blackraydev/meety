import { render, fireEvent } from '@testing-library/react';
import App from '../App';

describe('Meety', () => {
  const { getByText, getByTestId, getByPlaceholderText } = render(<App />);

  it('renders without crashing', () => {
    render(<App />);
  });

  it('starts with no participants', () => {
    const participants = getByText('Participants: 0');
    expect(participants).toBeInTheDocument();
  });
 
  it('adds a participant on join button click', () => {
    const joinButton = getByText('Join');
    fireEvent.click(joinButton);
    const participants = getByTestId('participants-count');
    expect(participants.textContent).toBe('Participants: 1');
  });

  it('removes a participant on leave button click', () => {
    const joinButton = getByText('Join');
    fireEvent.click(joinButton);
    const leaveButton = getByText('Leave');
    fireEvent.click(leaveButton);
    const participants = getByTestId('participants-count');
    expect(participants.textContent).toBe('Participants: 0');
  });

  it('displays video stream after joining the conference', () => {
    const joinButton = getByText('Join');
    fireEvent.click(joinButton);
    const videoStream = getByTestId('video-stream');
    expect(videoStream).toBeInTheDocument();
  });

  it('displays audio controls after joining the conference', () => {
    const joinButton = getByText('Join');
    fireEvent.click(joinButton);
    const audioControls = getByTestId('audio-controls');
    expect(audioControls).toBeInTheDocument();
  });

  it('disables audio on mute button click', () => {
    const joinButton = getByText('Join');
    fireEvent.click(joinButton);
    const muteButton = getByText('Mute');
    fireEvent.click(muteButton);
    const audioControls = getByTestId('audio-controls');
    expect(audioControls.getAttribute('data-audio-muted')).toBe('true');
  });

  it('enables audio on unmute button click', () => {
    const joinButton = getByText('Join');
    fireEvent.click(joinButton);
    const muteButton = getByText('Mute');
    fireEvent.click(muteButton);
    const unmuteButton = getByText('Unmute');
    fireEvent.click(unmuteButton);
    const audioControls = getByTestId('audio-controls');
    expect(audioControls.getAttribute('data-audio-muted')).toBe('false');
  });

  it('disables video on stop video button click', () => {
    const joinButton = getByText('Join');
    fireEvent.click(joinButton);
    const stopVideoButton = getByText('Stop Video');
    fireEvent.click(stopVideoButton);
    const videoControls = getByTestId('video-controls');
    expect(videoControls.getAttribute('data-video-stopped')).toBe('true');
  });

  it('starts with an empty chat', () => {
    const chatMessages = getByTestId('chat-messages');
    expect(chatMessages.children.length).toBe(0);
  });

  it('displays a new chat message on submit', () => {
    const joinButton = getByText('Join');
    fireEvent.click(joinButton);
    const chatInput = getByPlaceholderText('Enter your message...');
    const chatForm = getByTestId('chat-form');
    fireEvent.change(chatInput, { target: { value: 'Hello, world!' } });
    fireEvent.submit(chatForm);
    const chatMessages = getByTestId('chat-messages');
    expect(chatMessages.children.length).toBe(1);
    expect(chatMessages.children[0]).toHaveTextContent('Hello, world!');
  });

  it('displays a system message when a participant joins', () => {
    const joinButton = getByText('Join');
    fireEvent.click(joinButton);
    const participants = getByTestId('participants-count');
    expect(participants.textContent).toBe('Participants: 1');
    const chatMessages = getByTestId('chat-messages');
    expect(chatMessages.children.length).toBe(1);
    expect(chatMessages.children[0]).toHaveTextContent('A new participant joined the conference.');
  });

  it('displays a system message when a participant leaves', () => {
    const joinButton = getByText('Join');
    fireEvent.click(joinButton);
    const leaveButton = getByText('Leave');
    fireEvent.click(leaveButton);
    const participants = getByTestId('participants-count');
    expect(participants.textContent).toBe('Participants: 0');
    const chatMessages = getByTestId('chat-messages');
    expect(chatMessages.children.length).toBe(2);
    expect(chatMessages.children[1]).toHaveTextContent('A participant left the conference.');
  });

  it('starts with screen sharing disabled', () => {
    const joinButton = getByText('Join');
    fireEvent.click(joinButton);
    const screenSharingButton = getByTestId('screen-sharing-button');
    expect(screenSharingButton.textContent).toBe('Start Screen Sharing');
  });

  it('enables screen sharing on button click', () => {
    const joinButton = getByText('Join');
    fireEvent.click(joinButton);
    const screenSharingButton = getByTestId('screen-sharing-button');
    fireEvent.click(screenSharingButton);
    expect(screenSharingButton.textContent).toBe('Stop Screen Sharing');
    const screenSharingIndicator = getByTestId('screen-sharing-indicator');
    expect(screenSharingIndicator.textContent).toBe('Screen Sharing Enabled');
  });

  it('disables screen sharing on button click', () => {
    const joinButton = getByText('Join');
    fireEvent.click(joinButton);
    const screenSharingButton = getByTestId('screen-sharing-button');
    fireEvent.click(screenSharingButton);
    fireEvent.click(screenSharingButton);
    expect(screenSharingButton.textContent).toBe('Start Screen Sharing');
    const screenSharingIndicator = getByTestId('screen-sharing-indicator');
    expect(screenSharingIndicator.textContent).toBe('Screen Sharing Disabled');
  });
});
