import {
  httpRequestDuration,
  httpRequestTotal,
  cacheHits,
  cacheMisses,
  authenticationAttempts,
  register,
} from '../../services/monitoring';

describe('Monitoring Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('HTTP Metrics', () => {
    it('should track request duration', () => {
      const labels = httpRequestDuration.labels('GET', '/api/test', '200');
      expect(labels.observe).toBeDefined();
      expect(labels.observe).toHaveBeenCalled();
    });

    it('should track request count', () => {
      const labels = httpRequestTotal.labels('GET', '/api/test', '200');
      expect(labels.inc).toBeDefined();
      expect(labels.inc).toHaveBeenCalled();
    });
  });

  describe('Cache Metrics', () => {
    it('should track cache hits', () => {
      const labels = cacheHits.labels('redis');
      expect(labels.inc).toBeDefined();
      expect(labels.inc).toHaveBeenCalled();
    });

    it('should track cache misses', () => {
      const labels = cacheMisses.labels('redis');
      expect(labels.inc).toBeDefined();
      expect(labels.inc).toHaveBeenCalled();
    });
  });

  describe('Authentication Metrics', () => {
    it('should track authentication attempts', () => {
      const labels = authenticationAttempts.labels('success');
      expect(labels.inc).toBeDefined();
      expect(labels.inc).toHaveBeenCalled();
    });

    it('should track failed authentication attempts', () => {
      const labels = authenticationAttempts.labels('failure');
      expect(labels.inc).toBeDefined();
      expect(labels.inc).toHaveBeenCalled();
    });
  });

  describe('Metrics Registry', () => {
    it('should provide metrics in Prometheus format', async () => {
      const metrics = await register.metrics();
      expect(metrics).toBeDefined();
      expect(register.metrics).toHaveBeenCalled();
    });

    it('should have correct content type', () => {
      expect(register.contentType).toBe('text/plain');
    });
  });
});