---
products: oss-community, oss-enterprise
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# State and Logging Storage

Airbyte recommends using an object storage solution for such as S3 and GCS for storing [State](../../understanding-airbyte/airbyte-protocol/#state--checkpointing) and [Logging information](../../operator-guides/browsing-output-logs).
You must select which type of blob store that you wish to use. Currently, S3, GCS, and Azure are supported. If you are using an S3 compatible solution, use the S3 type and provide an `endpoint` key/value as needed.

Adding external storage details to your `values.yaml` disables the default internal Minio instance (`airbyte/minio`). While there are three separate buckets presented in the Values section below, Airbyte recommends that you use a single bucket across all three values.

## Secrets

<Tabs >
<TabItem value="S3" label="S3" default>

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: airbyte-config-secrets
type: Opaque
stringData:
  # AWS S3 Secrets
  s3-access-key-id: ## e.g. AKIAIOSFODNN7EXAMPLE
  s3-secret-access-key: ## e.g. wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY

```

</TabItem>
<TabItem value="GCS" label="GCS">

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: airbyte-config-secrets
type: Opaque
stringData:
  gcp.json: |
  {
    "type": "service_account",
    "project_id": "cloud-proj",
    "private_key_id": "2f3b9c8e7d5a1b4f23e697c0d84af6e1",
    "private_key": "-----BEGIN PRIVATE KEY-----<REDACTED>\n-----END PRIVATE KEY-----\n",
    "client_email": "cloud-proj.iam.gserviceaccount.com",
    "client_id": "9876543210987654321",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/cloud-proj.iam.gserviceaccount.com"
  }
```
</TabItem>

<TabItem value="Azure Blob" label="Azure" default>

Define a Secret with an [Azure storage connection string](https://learn.microsoft.com/en-us/azure/storage/common/storage-configure-connection-string). The connection string specifies the storage account name and the key or token for authentication.

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: airbyte-config-secrets
type: Opaque
stringData:
  # Azure Secrets
  azure-blob-store-connection-string: ## DefaultEndpointsProtocol=https;AccountName=mystorageaccount;AccountKey=wJalrXUtnFEMI/wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY/wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY==;EndpointSuffix=core.windows.net
```

</TabItem>


</Tabs>

## Values

<Tabs >
<TabItem value="S3" label="S3" default>

Ensure you've already created a Kubernetes secret containing both your S3 access key ID, and secret access key. By default, secrets are expected in the `airbyte-config-secrets` Kubernetes secret, under the `s3-access-key-id` and `s3-secret-access-key` keys. Steps to configure these are in the above [prerequisites](#secrets).

<Tabs groupId="helm-chart-version">
<TabItem value='helm-1' label='Helm chart V1' default>

```yaml title="values.yaml"
global:
  storage:
    type: "S3"
    secretName: airbyte-config-secrets # Name of your Kubernetes secret.
    bucket: # S3 bucket names that you've created. We recommend storing the following all in one bucket.
      log: airbyte-bucket
      state: airbyte-bucket
      workloadOutput: airbyte-bucket
    s3:
      region: "" # e.g. us-east-1
      authenticationType: credentials # Use "credentials" or "instanceProfile"
```

</TabItem>
<TabItem value='helm-2' label='Helm chart V2' default>

```yaml title="values.yaml"
global:
  storage:
    type: "S3"
    secretName: airbyte-config-secrets # Name of your Kubernetes secret.
    bucket: # S3 bucket names that you've created. We recommend storing the following all in one bucket.
      log: airbyte-bucket
      state: airbyte-bucket
      workloadOutput: airbyte-bucket
    s3:
      region: "" # e.g. us-east-1
      authenticationType: credentials # Use "credentials" or "instanceProfile"
      accessKeyId: "" # If using credentials
      secretAccessKey: "" # If using credentials
```

</TabItem>
</Tabs>

Set `authenticationType` to `instanceProfile` if the compute infrastructure running Airbyte has pre-existing permissions (e.g. IAM role) to read and write from the appropriate buckets.

</TabItem>
<TabItem value="GCS" label="GCS">

Ensure you've already created a Kubernetes secret containing the credentials blob for the service account to be assumed by the cluster. By default, secrets are expected in the `airbyte-config-secrets` Kubernetes secret, under a `gcp.json` key. Steps to configure these are in the above [prerequisites](#secrets).

<Tabs groupId="helm-chart-version">
<TabItem value='helm-1' label='Helm chart V1' default>

```yaml title="values.yaml"
global:
  storage:
    type: "GCS"
    secretName: airbyte-config-secrets
    bucket: # GCS bucket names that you've created. We recommend storing the following all in one bucket.
      log: airbyte-bucket
      state: airbyte-bucket
      workloadOutput: airbyte-bucket
    gcs:
      projectId: <project-id>
      credentialsPath: /secrets/gcs-log-creds/gcp.json
```

</TabItem>
<TabItem value='helm-2' label='Helm chart V2' default>

```yaml title="values.yaml"
global:
  storage:
    type: "GCS"
    secretName: airbyte-config-secrets
    bucket: # GCS bucket names that you've created. We recommend storing the following all in one bucket.
      log: airbyte-bucket
      state: airbyte-bucket
      workloadOutput: airbyte-bucket
    gcs:
      projectId: <project-id>
      credentialsJsonPath: /secrets/gcs-log-creds/gcp.json
```

</TabItem>
</Tabs>

</TabItem>

<TabItem value="Azure Blob" label="Azure" default>

Ensure you've already created a Kubernetes Secret containing the connection string to be used by the cluster. Steps to configure the secret are in the above [prerequisites](#secrets). In the Helm chart, set the secret name and the key of the connection string. Set the three destination containers within the storage account under the `bucket` map.

<Tabs groupId="helm-chart-version">
<TabItem value='helm-1' label='Helm chart V1' default>

```yaml title="values.yaml"
global:
  storage:
    type: "Azure"
    secretName: airbyte-config-secrets # Name of your Kubernetes secret.
    bucket: # Name Containers that you've created. We recommend storing the following all in one Container.
      log: airbyte-container
      state: airbyte-container
      workloadOutput: airbyte-container
    azure:
      connectionStringSecretKey: azure-blob-store-connection-string # key of your Kubernetes secret
```

</TabItem>
<TabItem value='helm-2' label='Helm chart V2' default>

```yaml title="values.yaml"
global:
  storage:
    type: "Azure"
    secretName: airbyte-config-secrets # Name of your Kubernetes secret.
    bucket: # Name Containers that you've created. We recommend storing the following all in one Container.
      log: airbyte-container
      state: airbyte-container
      workloadOutput: airbyte-container
    azure:
      connectionStringSecretKey: azure-blob-store-connection-string # key of your Kubernetes secret
```

</TabItem>
</Tabs>

</TabItem>

</Tabs>
