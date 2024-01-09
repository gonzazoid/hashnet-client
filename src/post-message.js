import publishHashMessage from "./publish-hash-message.js";
import publishSignedMessage from "./publish-signed-message.js";

const postMessage = async (message, label, nonce, relatedTo) => {
  const hash = await publishHashMessage(message);
  const data = {
    hash,
    label,
    nonce,
  };
  if (relatedTo) data.relatedTo = relatedTo;

  const response = await publishSignedMessage(data);
  if (response.status !== 200) throw new Error();
  data.editable = true;
  data.publicKey = window.getHashNetPublicKey();
  return data;
};

export default postMessage;
