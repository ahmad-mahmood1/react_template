import { api } from 'src/apis/api.ts';
import { endpoints } from 'src/apis/endpoints.ts';
import { Settings } from 'src/interfaces/interfaces.ts';

export const settingsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    settings: builder.query<Settings[], void>({
      query: () => ({
        url: endpoints.SETTINGS,
        method: 'GET',
      }),
      providesTags: ['Settings'],
    }),
    updateSetting: builder.mutation<void, { settingId: number; value: string }>({
      query: ({ settingId, value }) => ({
        url: endpoints.SETTING(settingId),
        method: 'PUT',
        body: { value },
      }),
      invalidatesTags: ['Settings'],
    }),
  }),
});

export const { useSettingsQuery, useUpdateSettingMutation } = settingsApi;
