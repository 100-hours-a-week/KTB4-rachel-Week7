export function renderPostWriteLayout() {
    return `
    <div class="post-write-container">
        <h1 class="post-write-page-title">게시글 작성</h1>
        
        <form id="postWriteForm" class="post-write-form">
            <div class="form-group">
                <label for="postTitleInput" class="form-label">제목*</label>
                <input 
                    type="text" 
                    id="postTitleInput" 
                    class="form-input" 
                    placeholder="제목을 입력해주세요. (최대 26글자)" 
                    maxlength="26"
                    required
                >
            </div>

            <div class="form-group">
                <label for="postContentInput" class="form-label">내용*</label>
                <textarea 
                    id="postContentInput" 
                    class="form-textarea" 
                    placeholder="내용을 입력해주세요." 
                    required
                ></textarea>
            </div>

            <div id="writeHelperText" class="helper-text hidden">*제목, 내용을 모두 작성해주세요.</div>

            <div class="form-group margin-top-sm">
                <label class="form-label">이미지</label>
                <div class="file-upload-wrapper">
                    <input 
                        type="file" 
                        id="postImageInput" 
                        class="file-input" 
                        accept="image/*"
                    >
                </div>
            </div>

            <div class="form-submit-row">
                <button type="submit" id="postSubmitBtn" class="btn-submit" disabled>완료</button>
            </div>
        </form>
    </div>
    `;
}