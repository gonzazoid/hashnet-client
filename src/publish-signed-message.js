const publishSignedMessage = (data) => {
  if (!window.getHashNetPublicKey) throw new Error();
  // TODO verify data

  const publicKey = window.getHashNetPublicKey();
  return fetch(`signed://${publicKey.replace(":", "/")}`, { method: "post", body: JSON.stringify(data) });
};

export default publishSignedMessage;
