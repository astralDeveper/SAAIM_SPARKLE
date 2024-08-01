const MAX_VIDEO_PARTICIPANTS = 2;
let videoParticipants = [];
let participantStreams = {};  // Track streams for each participant

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('A user disconnected');
      videoParticipants = videoParticipants.filter(participant => participant !== socket.id);
      delete participantStreams[socket.id];  // Remove stream data for disconnected participant
      // Notify all remaining participants about the disconnection
      io.emit('participant-disconnected', socket.id);
    });

    // Handle request to join video
    socket.on('join-video', () => {
      if (videoParticipants.length < MAX_VIDEO_PARTICIPANTS) {
        videoParticipants.push(socket.id);
        socket.emit('video-accepted');
        // Broadcast existing streams to the new participant
        for (let participant of videoParticipants) {
          if (participant !== socket.id) {
            socket.emit('participant-stream', participantStreams[participant]);
          }
        }
      } else {
        socket.emit('video-rejected');
      }
    });

    // Handle offer, answer, and candidate
    socket.on('offer', (offer) => {
      socket.broadcast.emit('offer', offer);
    });

    socket.on('answer', (answer) => {
      socket.broadcast.emit('answer', answer);
    });

    socket.on('candidate', (candidate) => {
      socket.broadcast.emit('candidate', candidate);
    });

    // Handle chat messages
    socket.on('chat-message', (chatMessage) => {
      console.log('Received chat message:', chatMessage);
      io.emit('chat-message', chatMessage);
    });

    // Store stream data for a participant
    socket.on('stream-data', (streamData) => {
      participantStreams[socket.id] = streamData;
      // Notify all other participants about the new stream
      socket.broadcast.emit('participant-stream', streamData);
    });
  });
};