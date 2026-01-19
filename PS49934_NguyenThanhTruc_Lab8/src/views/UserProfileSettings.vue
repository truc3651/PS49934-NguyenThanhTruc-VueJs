<template>
  <div class="card">
    <div class="card-header">
      <h5 class="mb-0">Cài đặt người dùng</h5>
    </div>
    <div class="card-body">
      <form>
        <div class="mb-3">
          <label for="notifications" class="form-label">Thông báo</label>
          <select id="notifications" class="form-select">
            <option>Bật</option>
            <option>Tắt</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="language" class="form-label">Ngôn ngữ</label>
          <select id="language" class="form-select">
            <option>Tiếng Việt</option>
            <option>English</option>
          </select>
        </div>
        <div class="mb-3 form-check">
          <input type="checkbox" class="form-check-input" id="newsletter" />
          <label class="form-check-label" for="newsletter">
            Nhận bản tin qua email
          </label>
        </div>
        <button type="submit" class="btn btn-primary">Lưu cài đặt</button>
      </form>
    </div>
  </div>
</template>