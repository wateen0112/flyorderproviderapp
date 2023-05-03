<script lang="ts" setup>
import type { Anchor } from "vuetify/lib/components";
import { avatarText } from "@core/utils/formatters";
import { useRouter } from "vue-router";
import { useNotificationStore } from "@/stores/Notification";
import { HOST_DOMAIN } from "../../../app.config";
import type { NotificationUnRead } from "@/api/Notification/dto";
const router = useRouter();
const store = useNotificationStore();
// type Notification = {
//   dateCreated: string;
//   notificationDashType: string;
//   onClick: string;
//   title: string;
// };
// type TypeNotification = {
//   value: string;
//   type: string;
// };
interface Props {
  notifications: NotificationUnRead[];
  badgeProps?: unknown;
  location?: Anchor;
}

const props = withDefaults(defineProps<Props>(), {
  location: "bottom end",
  badgeProps: undefined,
});

defineEmits<{
  (e: "click:readAllNotifications"): void;
}>();

function readNotification(item: NotificationUnRead) {
  console.log(item);
  if (item.notificationDashType == "NewContactUs")
    router.push(`${"/" + item.onClick}`);
  else if (item.notificationDashType == "DelayOrder") handleDelayOrder();
  else if (item.notificationDashType == "NewOrder") handleNewOrder();

  store.ReadNoti(item.id).then(() => {
    store.NotificationsUnRead = store.NotificationsUnRead.filter(
      (ele) => ele.notificationDashType != item.notificationDashType
    );
  });
}
function handleNewOrder() {}
function handleDelayOrder() {}
</script>

<template>
  <VBadge :model-value="!!props.badgeProps" v-bind="props.badgeProps">
    <VBtn icon variant="text" color="default" size="small">
      <VBadge
        :model-value="!!props.notifications.length"
        color="error"
        :content="props.notifications.length"
      >
        <VIcon icon="tabler-bell" size="24" />
      </VBadge>

      <VMenu
        activator="parent"
        width="380px"
        :location="props.location"
        offset="14px"
      >
        <VList class="py-0">
          <!-- 👉 Header -->
          <VListItem
            title="Notifications"
            class="notification-section"
            height="48px"
          >
            <template #append>
              <VChip
                v-if="props.notifications.length"
                color="primary"
                size="small"
              >
                {{ props.notifications.length }} New
              </VChip>
            </template>
          </VListItem>

          <VDivider />

          <!-- 👉 Notifications list -->
          <!-- {{ props.notifications }} -->
          <template
            v-for="notification in props.notifications"
            :key="notification.title"
          >
            <VListItem
              :title="notification.title"
              :subtitle="
                new Date(notification.dateCreated).toLocaleDateString()
              "
              link
              lines="one"
              min-height="66px"
              @click="readNotification(notification)"
            >
              <!-- Slot: Prepend -->
              <!-- Handles Avatar: Image, Icon, Text -->
              <template #prepend>
                <VListItemAction start>
                  <!-- :color="notification.color || 'primary'" -->
                  <!-- :icon="notification.icon || undefined" -->
                  <VAvatar
                    image="https://freeiconshop.com/wp-content/uploads/edd/notification-flat.png"
                    size="40"
                    variant="tonal"
                  >
                    <!-- <span v-if="notification.text">{{
                      avatarText(notification.text)
                    }}</span> -->
                  </VAvatar>
                </VListItemAction>
              </template>
              <!-- Slot: Append -->
              <!-- notificationType.value.find((ele:TypeNotification)=>ele) -->
              <template #append>
                <small class="whitespace-no-wrap text-medium-emphasis">{{
                  store.notificationType.find(
                    (ele) => ele.type == notification.notificationDashType
                  )?.value
                }}</small>
              </template>
            </VListItem>
            <VDivider />
          </template>

          <!-- 👉 Footer -->
          <VListItem class="notification-section">
            <!-- $emit('click:readAllNotifications') -->
            <VBtn block @click="store.ReadNoti(null)">
              READ ALL NOTIFICATIONS
            </VBtn>
          </VListItem>
        </VList>
      </VMenu>
    </VBtn>
  </VBadge>
</template>

<style lang="scss">
.notification-section {
  padding: 14px !important;
}
</style>
