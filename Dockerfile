FROM python:3.11-slim

# Create a non-root user to run the application
RUN groupadd -g 1000 appuser && useradd -u 1000 -g appuser appuser

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Create directories with proper permissions - make world-writable for OpenShift compatibility
RUN mkdir -p /app/user_data /app/learning_plans /app/data \
    && chmod -R 777 /app/user_data /app/learning_plans /app/data \
    && chown -R appuser:appuser /app

# Expose the port
EXPOSE 8000

# Entry point script to handle permissions dynamically
COPY --chown=appuser:appuser ./docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]