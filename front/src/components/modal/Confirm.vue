<template>
  <Modal ref="baseModal">
    <div class="content-container">
      <p v-for="text in content" :key="text">
        {{ text }}
      </p>
    </div>
    <div class="buttons-container">
      <button class="btn confirm" v-on:click="confirm">확인</button>
      <button class="btn cancel" v-on:click="cancel">취소</button>
    </div>
  </Modal>
</template>

<script>
import Modal from "./BaseModal.vue";
import { ref } from "vue";

export default {
  name: "ConfirmationModal",
  components: {
    Modal,
  },
  // 렌더링할 텍스트를 가져옵니다.
  props: {
    content: Array,
  },
  setup() {
    // 자식 컴포넌트를 핸들링하기 위한 ref
    const baseModal = ref(null);
    // Promise 객체를 핸들링하기 위한 ref
    const resolvePromise = ref(null);

    const show = () => {
      // baseModal을 직접 컨트롤합니다.
      baseModal.value.open();
      // Promise 객체를 사용하여, 현재 모달에서 확인 / 취소의
      // 응답이 돌아가기 전까지 작업을 기다리게 할 수 있습니다.
      return new Promise((resolve, _) => {
        // resolve 함수를 담아 외부에서 사용합니다.
        resolvePromise.value = resolve;
      });
    };

    const confirm = () => {
      baseModal.value.close();
      resolvePromise.value(true);
    };

    const cancel = () => {
      baseModal.value.close();
      resolvePromise.value(false);
    };
    return { baseModal, show, confirm, cancel };
  },
};
</script>