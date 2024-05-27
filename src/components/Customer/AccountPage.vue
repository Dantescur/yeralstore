<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import type { Session } from '@supabase/supabase-js'
import { toRefs, computed } from 'vue'

const props = defineProps<{
  session: Session
}>()

const userStore = useUserStore()

const { session } = toRefs(props)

const email = computed(() => session.value?.user.email)
const firstname = computed(() => session.value?.user.user_metadata.firstname)
const lastname = computed(() => session.value?.user.user_metadata.lastname)
const emailVerified = computed(() => session.value.user.email_confirmed_at !== null)

</script>

<template>
  <el-card shadow="always">
    <template #header>
      <div class="clearfix">
        <span>Profile</span>
      </div>
    </template>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-avatar :size="100" :src="userStore.userAvatar" />
      </el-col>
      <el-col :span="12">
        <el-descriptions :column="1" border>
          <el-descriptions-item label="First Name">
            {{ firstname }}
          </el-descriptions-item>
          <el-descriptions-item label="Last Name">
            {{ lastname }}
          </el-descriptions-item>
          <el-descriptions-item label="Email">
            {{ email }}
          </el-descriptions-item>
          <el-descriptions-item label="Email Verified">
            <el-tag :type="emailVerified ? 'success' : 'danger'" effect="plain" size="small">
              {{ emailVerified ? 'Yes' : 'No' }}
            </el-tag>
          </el-descriptions-item>
        </el-descriptions>
      </el-col>
    </el-row>
  </el-card>
</template>
