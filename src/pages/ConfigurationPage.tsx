import { useState } from 'react';
import { Settings, Loader2, AlertCircle, CheckCircle, Pencil, Trash2, Plus, X } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';

import {
  useGetApiApplicationConfigurations,
  usePutApiApplicationConfigurationsKey,
  useDeleteApiApplicationConfigurationsKey,
  usePostApiApplicationConfigurations,
  getGetApiApplicationConfigurationsQueryKey,
} from '@/api/application-configurations/application-configurations';
import type {
  ApplicationConfigurationDto,
  ConfigurationValueType,
  CreateApplicationConfigurationRequest,
  UpdateApplicationConfigurationRequest,
} from '@/api';
import { Button } from '@/components/ui/button';

const VALUE_TYPE_OPTIONS: { value: ConfigurationValueType; label: string }[] = [
  { value: 'String', label: 'String' },
  { value: 'Boolean', label: 'Boolean' },
  { value: 'Integer', label: 'Integer' },
  { value: 'Decimal', label: 'Decimal' },
  { value: 'Json', label: 'JSON' },
];

function formatDate(dateString: string | undefined): string {
  if (!dateString) return '—';
  try {
    return new Date(dateString).toLocaleString();
  } catch {
    return dateString;
  }
}

function getValueTypeLabel(valueType: ConfigurationValueType | undefined): string {
  return VALUE_TYPE_OPTIONS.find((opt) => opt.value === valueType)?.label ?? 'Unknown';
}

type FormState = {
  key: string;
  value: string;
  valueType: ConfigurationValueType;
  description: string;
  isSystem: boolean;
};

type EditMode = 'none' | 'create' | 'edit';

function emptyForm(): FormState {
  return { key: '', value: '', valueType: 'String', description: '', isSystem: false };
}

function toFormState(dto: ApplicationConfigurationDto): FormState {
  return {
    key: dto.key ?? '',
    value: dto.value ?? '',
    valueType: dto.valueType ?? 'String',
    description: dto.description ?? '',
    isSystem: dto.isSystem ?? false,
  };
}

export default function ConfigurationPage() {
  const { data: configurations, isLoading, isError } = useGetApiApplicationConfigurations();
  const queryClient = useQueryClient();

  const updateMutation = usePutApiApplicationConfigurationsKey();
  const deleteMutation = useDeleteApiApplicationConfigurationsKey();
  const createMutation = usePostApiApplicationConfigurations();

  const [editMode, setEditMode] = useState<EditMode>('none');
  const [editingItem, setEditingItem] = useState<FormState>(emptyForm());
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleStartCreate = () => {
    setEditingItem(emptyForm());
    setEditMode('create');
    setSaveStatus('idle');
  };

  const handleStartEdit = (item: ApplicationConfigurationDto) => {
    setEditingItem(toFormState(item));
    setEditMode('edit');
    setSaveStatus('idle');
  };

  const handleCancel = () => {
    setEditMode('none');
    setEditingItem(emptyForm());
    setDeleteConfirm(null);
  };

  const handleSave = async () => {
    setSaveStatus('idle');

    try {
      if (editMode === 'create') {
        const request: CreateApplicationConfigurationRequest = {
          key: editingItem.key,
          value: editingItem.value,
          valueType: editingItem.valueType,
          description: editingItem.description || null,
          isSystem: editingItem.isSystem,
        };
        await createMutation.mutateAsync({ data: request });
      } else if (editMode === 'edit') {
        const request: UpdateApplicationConfigurationRequest = {
          value: editingItem.value,
          valueType: editingItem.valueType,
          description: editingItem.description || null,
        };
        await updateMutation.mutateAsync({ key: editingItem.key, data: request });
      }

      setSaveStatus('success');
      await queryClient.invalidateQueries({ queryKey: getGetApiApplicationConfigurationsQueryKey() });

      setTimeout(() => {
        handleCancel();
      }, 1500);
    } catch (error) {
      console.error('Failed to save configuration:', error);
      setSaveStatus('error');
    }
  };

  const handleDelete = async (key: string) => {
    try {
      await deleteMutation.mutateAsync({ key });
      await queryClient.invalidateQueries({ queryKey: getGetApiApplicationConfigurationsQueryKey() });
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Failed to delete configuration:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-5xl animate-fade-in">
        <div className="glass rounded-3xl border border-destructive/50 p-8 text-center shadow-moderate">
          <AlertCircle className="mx-auto mb-4 h-10 w-10 text-destructive" />
          <p className="text-lg font-medium text-destructive">Failed to load configurations.</p>
          <p className="mt-2 text-sm text-muted-foreground">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 animate-fade-in">
      <div className="glass rounded-3xl border border-border/50 p-8 shadow-moderate">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-gradient-primary p-3 shadow-moderate">
              <Settings className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Configuration</h1>
              <p className="text-lg text-muted-foreground">Manage application settings.</p>
            </div>
          </div>

          <Button onClick={handleStartCreate} disabled={editMode !== 'none'}>
            <Plus className="mr-2 h-4 w-4" />
            Add Configuration
          </Button>
        </div>
      </div>

      {/* Create/Edit Form */}
      {editMode !== 'none' && (
        <div className="glass animate-slide-up rounded-3xl border border-border/50 p-8 shadow-moderate">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-foreground">
              {editMode === 'create' ? 'New Configuration' : `Edit: ${editingItem.key}`}
            </h2>
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              aria-label="Cancel"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="config-key" className="text-sm font-medium text-foreground">
                  Key
                </label>
                <input
                  id="config-key"
                  type="text"
                  value={editingItem.key}
                  onChange={(e) => setEditingItem((prev) => ({ ...prev, key: e.target.value }))}
                  disabled={editMode === 'edit' || editingItem.isSystem}
                  className="glass w-full rounded-2xl border border-border/50 bg-input px-4 py-3 text-sm transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Configuration key"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="config-value-type" className="text-sm font-medium text-foreground">
                  Value Type
                </label>
                <select
                  id="config-value-type"
                  value={editingItem.valueType}
                  onChange={(e) =>
                    setEditingItem((prev) => ({ ...prev, valueType: e.target.value as ConfigurationValueType }))
                  }
                  disabled={editMode === 'edit'}
                  className="glass w-full rounded-2xl border border-border/50 bg-input px-4 py-3 text-sm transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {VALUE_TYPE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="config-value" className="text-sm font-medium text-foreground">
                Value
              </label>
              {editingItem.valueType === 'Boolean' ? (
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingItem((prev) => ({ ...prev, value: 'true' }))}
                    className={`rounded-xl border px-4 py-2 text-sm transition-colors ${
                      editingItem.value === 'true'
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border/50 bg-input hover:bg-accent'
                    }`}
                  >
                    True
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingItem((prev) => ({ ...prev, value: 'false' }))}
                    className={`rounded-xl border px-4 py-2 text-sm transition-colors ${
                      editingItem.value === 'false'
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-border/50 bg-input hover:bg-accent'
                    }`}
                  >
                    False
                  </button>
                </div>
              ) : (
                <textarea
                  id="config-value"
                  value={editingItem.value}
                  onChange={(e) => setEditingItem((prev) => ({ ...prev, value: e.target.value }))}
                  rows={editingItem.valueType === 'Json' ? 5 : 2}
                  className="glass w-full rounded-2xl border border-border/50 bg-input px-4 py-3 text-sm transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                  placeholder={editingItem.valueType === 'Json' ? '{\n  "key": "value"\n}' : 'Configuration value'}
                />
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="config-description" className="text-sm font-medium text-foreground">
                Description
              </label>
              <input
                id="config-description"
                type="text"
                value={editingItem.description}
                onChange={(e) => setEditingItem((prev) => ({ ...prev, description: e.target.value }))}
                className="glass w-full rounded-2xl border border-border/50 bg-input px-4 py-3 text-sm transition-colors focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                placeholder="Optional description"
              />
            </div>

            {editMode === 'create' && (
              <div className="flex items-center gap-3">
                <input
                  id="config-is-system"
                  type="checkbox"
                  checked={editingItem.isSystem}
                  onChange={(e) => setEditingItem((prev) => ({ ...prev, isSystem: e.target.checked }))}
                  className="h-5 w-5 rounded border-border/50 bg-input text-primary focus:ring-2 focus:ring-primary/20"
                />
                <label htmlFor="config-is-system" className="text-sm font-medium text-foreground">
                  System configuration
                </label>
              </div>
            )}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {saveStatus === 'success' && (
                <div className="flex animate-fade-in items-center gap-2 text-success">
                  <CheckCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">Saved successfully.</span>
                </div>
              )}
              {saveStatus === 'error' && (
                <div className="flex animate-fade-in items-center gap-2 text-destructive">
                  <AlertCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">Failed to save. Please try again.</span>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleCancel}
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={
                  createMutation.isPending ||
                  updateMutation.isPending ||
                  !editingItem.key.trim() ||
                  (editMode === 'create' && configurations?.data.some((c) => c.key === editingItem.key))
                }
              >
                {(createMutation.isPending || updateMutation.isPending) && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {editMode === 'create' ? 'Create' : 'Save'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Configuration List */}
      <div className="glass rounded-3xl border border-border/50 shadow-moderate">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/30">
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Key</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Value</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Updated</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {configurations?.data && configurations.data.length > 0 ? (
                configurations.data.map((config) => (
                  <tr
                    key={config.key}
                    className="group border-b border-border/20 transition-colors hover:bg-accent/30 last:border-b-0"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {config.isSystem && (
                          <span className="rounded bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                            System
                          </span>
                        )}
                        <span className="font-mono text-sm font-medium text-foreground">{config.key}</span>
                      </div>
                      {config.description && <p className="mt-1 text-xs text-muted-foreground">{config.description}</p>}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="max-w-48 truncate block font-mono text-sm text-muted-foreground"
                        title={config.value}
                      >
                        {config.value || '—'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="rounded bg-secondary/30 px-2 py-1 text-xs font-medium text-secondary-foreground">
                        {getValueTypeLabel(config.valueType)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{formatDate(config.updatedAtUtc)}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleStartEdit(config)}
                          disabled={editMode !== 'none'}
                          className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        {!config.isSystem && (
                          <>
                            {deleteConfirm === config.key ? (
                              <>
                                <button
                                  type="button"
                                  onClick={() => handleDelete(config.key!)}
                                  disabled={deleteMutation.isPending}
                                  className="rounded-lg bg-destructive/10 px-3 py-1.5 text-xs font-medium text-destructive transition-colors hover:bg-destructive/20 disabled:opacity-50"
                                >
                                  {deleteMutation.isPending ? 'Deleting…' : 'Confirm'}
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setDeleteConfirm(null)}
                                  className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent"
                                  title="Cancel"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </>
                            ) : (
                              <button
                                type="button"
                                onClick={() => setDeleteConfirm(config.key!)}
                                disabled={editMode !== 'none'}
                                className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive disabled:cursor-not-allowed disabled:opacity-50"
                                title="Delete"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <p className="text-muted-foreground">No configurations found.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
