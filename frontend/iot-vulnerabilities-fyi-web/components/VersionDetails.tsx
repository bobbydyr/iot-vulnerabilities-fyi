import React from "react";
import { Modal, Button, Text, Input, Row, Checkbox } from "@nextui-org/react";

type props = {
  visibleState: any,
  data: any
};

export default function VersionDetails({visibleState, data}: props) {
  const [visible, setVisible] = visibleState;
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  return (
    <div>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
        width='50%'
      >
        <Modal.Header>
          <div className="text-[22px] font-[600]">
            {data.version}
          </div>
        </Modal.Header>
        <Modal.Body>
          {data.vulnerabilities.map((item: any, index: any) => {
            return (
              <div 
                key={index}
                className=""
              >
                  {item}
              </div>
            )
          })}
        </Modal.Body>
        <Modal.Footer>

        </Modal.Footer>
      </Modal>
    </div>
  );
}