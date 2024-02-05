<template>
  <div class="overlay">
      <div class="modal fade show" tabindex="-1" aria-labelledby="modalLabel" style="display: block;">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalLabel">Delete Confirmation</h5>
              <button @click="closeModal" type="button" class="btn-close" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>Are you sure you want to delete this blog?</p>
              <!-- Additional modal content or controls go here -->
            </div>
            <div class="modal-footer">
              <button @click="deleteBlog" type="button" class="btn btn-danger">Delete</button>
              <button @click="closeModal" type="button" class="btn btn-secondary">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>