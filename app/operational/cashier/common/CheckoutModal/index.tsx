import { Modal } from "@mui/material";

const CheckoutModal = () => {

    return (
        <Modal
            open={false}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            style={ {zIndex: 99999999999} }>
            <></>
        </Modal>
    );

}

export default CheckoutModal;