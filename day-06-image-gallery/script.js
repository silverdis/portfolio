// 이미지 클릭 시 모달 오픈 & 닫기 기능

document.addEventListener('DOMContentLoaded', function () {
    const galleryImages = document.querySelectorAll('.gallery-image');
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const modalClose = document.getElementById('modal-close');

    galleryImages.forEach(img => {
        img.addEventListener('click', function (e) {
            modalImg.src = img.src;
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // 스크롤 방지
        });
    });

    // 모달 닫기 함수
    function closeModal() {
        modal.style.display = 'none';
        modalImg.src = '';
        document.body.style.overflow = '';
    }

    // 모달 닫기 (배경이나 큰 이미지 클릭 시)
    modal.addEventListener('click', function (e) {
        if (e.target === modal || e.target === modalImg) {
            closeModal();
        }
    });

    // 닫기(X) 버튼 클릭 시
    if (modalClose) {
        modalClose.addEventListener('click', function (e) {
            e.stopPropagation(); // 모달 배경 클릭 이벤트와 중복 방지
            closeModal();
        });
    }

    // ESC 키로 닫기
    document.addEventListener('keydown', function (e) {
        if (modal.style.display === 'flex' && (e.key === 'Escape' || e.key === 'Esc')) {
            closeModal();
        }
    });
});
